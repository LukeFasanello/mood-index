from fastapi import FastAPI, HTTPException
app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/{num}")
async def getNum(num):
    raise HTTPException(status_code=401, detail="Not authorized!")

@app.get("/items/{num}")
async def getItemsNum(num):
    return num






