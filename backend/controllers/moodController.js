const pool = require('../config/database');
const { body, validationResult } = require('express-validator');

// Validation rules for mood entry
exports.createMoodValidation = [
  body('entry_date')
    .isISO8601()
    .withMessage('Must be a valid date'),
  body('mood_value')
    .isInt({ min: -10, max: 10 })
    .withMessage('Mood value must be between -10 and 10'),
  body('entry_text')
    .optional()
    .isString()
    .trim()
    .isLength({ max: 5000 })
    .withMessage('Entry text must be less than 5000 characters')
];

// Create a new mood entry
exports.createMood = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { entry_date, mood_value, entry_text } = req.body;
    const userId = req.userId; // From auth middleware

    console.log('=== BACKEND DEBUG ===');
    console.log('Received entry_date:', entry_date);
    console.log('Type:', typeof entry_date);


    // Insert mood entry - PostgreSQL will handle the date properly
    const newMood = await pool.query(
      'INSERT INTO mood_entries (user_id, entry_date, mood_value, entry_text) VALUES ($1, $2, $3, $4) RETURNING *',
      [userId, entry_date, mood_value, entry_text || null]
    );

    console.log('Stored in DB:', newMood.rows[0].entry_date);
    console.log('Full row:', newMood.rows[0]);

    res.status(201).json({
      message: 'Mood entry created successfully',
      mood: newMood.rows[0]
    });

  } catch (error) {
    // Check for unique constraint violation (one entry per day)
    if (error.code === '23505') {
      return res.status(400).json({ error: 'You already have an entry for this date' });
    }
    console.error('Create mood error:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all mood entries for the authenticated user
exports.getMoods = async (req, res) => {
  try {
    const userId = req.userId; // From auth middleware

    const moods = await pool.query(
      'SELECT * FROM mood_entries WHERE user_id = $1 ORDER BY entry_date DESC',
      [userId]
    );

    res.json({
      count: moods.rows.length,
      moods: moods.rows
    });

  } catch (error) {
    console.error('Get moods error:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get a single mood entry by date
exports.getMoodByDate = async (req, res) => {
  try {
    const userId = req.userId;
    const { date } = req.params;

    const mood = await pool.query(
      'SELECT * FROM mood_entries WHERE user_id = $1 AND entry_date = $2',
      [userId, date]
    );

    if (mood.rows.length === 0) {
      return res.status(404).json({ error: 'No mood entry found for this date' });
    }

    res.json({ mood: mood.rows[0] });

  } catch (error) {
    console.error('Get mood by date error:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete a mood entry
exports.deleteMood = async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;

    // Check if mood entry exists and belongs to user
    const mood = await pool.query(
      'SELECT * FROM mood_entries WHERE id = $1 AND user_id = $2',
      [id, userId]
    );

    if (mood.rows.length === 0) {
      return res.status(404).json({ error: 'Mood entry not found' });
    }

    // Delete the mood entry
    await pool.query(
      'DELETE FROM mood_entries WHERE id = $1 AND user_id = $2',
      [id, userId]
    );

    res.json({ message: 'Mood entry deleted successfully' });

  } catch (error) {
    console.error('Delete mood error:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// Update validation rules
exports.updateMoodValidation = [
  body('mood_value')
    .optional()
    .isInt({ min: -10, max: 10 })
    .withMessage('Mood value must be between -10 and 10'),
  body('entry_text')
    .optional()
    .isString()
    .trim()
    .isLength({ max: 5000 })
    .withMessage('Entry text must be less than 5000 characters')
];

// Update a mood entry
exports.updateMood = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const userId = req.userId;
    const { id } = req.params;
    const { mood_value, entry_text } = req.body;

    // Check if mood entry exists and belongs to user
    const mood = await pool.query(
      'SELECT * FROM mood_entries WHERE id = $1 AND user_id = $2',
      [id, userId]
    );

    if (mood.rows.length === 0) {
      return res.status(404).json({ error: 'Mood entry not found' });
    }

    // Build update query dynamically based on what fields are provided
    const updates = [];
    const values = [];
    let paramCount = 1;

    if (mood_value !== undefined) {
      updates.push(`mood_value = $${paramCount}`);
      values.push(mood_value);
      paramCount++;
    }

    if (entry_text !== undefined) {
      updates.push(`entry_text = $${paramCount}`);
      values.push(entry_text);
      paramCount++;
    }

    if (updates.length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }

    // Add id and userId to values array
    values.push(id, userId);

    const updateQuery = `
      UPDATE mood_entries 
      SET ${updates.join(', ')} 
      WHERE id = $${paramCount} AND user_id = $${paramCount + 1}
      RETURNING *
    `;

    const updatedMood = await pool.query(updateQuery, values);

    res.json({
      message: 'Mood entry updated successfully',
      mood: updatedMood.rows[0]
    });

  } catch (error) {
    console.error('Update mood error:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};