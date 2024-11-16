const express = require("express")
const app = express();


const {initializeDatabase}= require("./db/db.connect")
const NewCars = require("./models/newCars.models")
const User = require("./models/users.models");

app.use(express.json())

initializeDatabase()





// const newCar = {
//     title: "Mercedes-Benz AMG",
//     description: "The Mercedes-Benz AMG G-63 is a high-performance luxury SUV that combines iconic design, unmatched off-road capability, and exhilarating power",
//     imageUrl: "https://images.pexels.com/photos/8622797/pexels-photo-8622797.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//     tags: ["Luxury SUV", "High-Performance SUV", "Mercedes-Benz"]
// }

async function createUser(userData) {
    try {
        const user = new User(userData);
        const savedUser = await user.save();
        return savedUser;
    } catch (error) {
        throw error;
    }
}

app.post("/users", async (req, res) => {
    try {
        const savedUser = await createUser(req.body);
        res.status(201).json({ message: "User created successfully", user: savedUser });
    } catch (error) {
        res.status(500).json({ error: "Failed to create user" });
    }
});

async function createCar(newCar){
   try{
      const car = new NewCars(newCar)
      const saveCar = await car.save()
      return saveCar
   }catch(error){
      throw error
   }
}


app.post("/cars", async(req, res)=>{
    try{
      const savedCar = await createCar(req.body)
      res.status(201).json({message: "Car added successfully", car: savedCar})
    }catch(error){
       res.status(500).json({error: "Failed to add car"})
    }
})





async function readCarByTitle(cartitle){
    try{
       const car = await NewCars.findOne({title : cartitle})
       return car
    }catch(error){
       throw error
    }
}

app.get("/cars//title/:title", async(req, res)=>{
    try{
        const car = await readCarByTitle(req.params.title)
        if(car){
            res.json(car)
        }else{
            res.status(404).json({error: 'Car Not Found'})
        }

    }catch(error){
        res.status(500).json({error:"failed to fetch cars"})
    }
})

async function readCarById(carId) {
    try {
        const car = await NewCars.findById(carId);
        return car;
    } catch (error) {
        throw error;
    }
}

app.get("/cars/:id", async (req, res) => {
    try {
        const car = await readCarById(req.params.id);
        if (car) {
            res.json(car);
        } else {
            res.status(404).json({ error: "Car Not Found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch car" });
    }
});


async function readAllCars(){
    try{
       const AllCars= await NewCars.find()
       return AllCars
    }catch(error){
      console.log(error)
    }
}



app.get("/cars", async(req, res)=>{
    try{
       const cars = await readAllCars()
       if(cars){
        res.json(cars)
       }else{
        res.status(404).json({error: "No Cars found"})
       }
    }catch(error){
        res.status(500).json({error: "failed to fetch cars"})
    }
})

//find one data and update the value
async function updateCar(carId, dataToUpdate){
 try{
    const updatedCar = await NewCars.findByIdAndUpdate(carId, dataToUpdate,{new:true})
   return updatedCar
 }catch(error){
    console.log("error in updating title", error)
 }
}

app.post("/cars/:carId", async(req,res)=>{
    try{
       const updatedCar = await updateCar(req.params.carId, req.body)
       if(updatedCar){
        res.status(200).json({message: "car updated successfully", updatedCar: updatedCar})
       }else{
        res.status(404).json({error: "Car not found"})
       }
    }catch(error){
        res.status(500).json({error: "error in updating cars"})
    }
})

//updateCar("673854f9590068e584cad2e5", {title:"Toyota Land Cruiser 250"})

//find a car by id and delete from the database

async function deleteCar(carId){
    try{
      const deletedCar = await NewCars.findByIdAndDelete(carId)
      return deletedCar
    }catch(error){
      console.log("error in deleting car", error)
    }
}

app.delete("/cars/:carId", async(req, res)=>{
    try{
       const deletedCar = await deleteCar(req.params.carId)
       if(deletedCar){
        res.status(200).json({message: 'Car deleted Successfully'})
       }
       
    }catch(error){
        res.status(500).json({error: "Failed to delete car"})
    }
})

const PORT =3000;

app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
})