import Car from "../Models/Car.js";
import _store from "../store.js";
import store from "../store.js";

let _api = axios.create({
  baseURL: "//bcw-sandbox.herokuapp.com/api/cars",
  timeout: 3000
});
class CarService {
  //READ
  getCars() {
    _api
      .get()
      .then(res => {
        let cars = res.data.data.map(rawCarData => new Car(rawCarData));
        store.commit("cars", cars);
        console.log(store.State);
      })
      .catch(err => console.error(err));
  }

  //DELETE
  delete(carId) {
    _api
      .delete(carId)
      .then(res => {
        console.log(res.data);
        this.getCars();
      })
      .catch(err => console.error(err));
  }

  //CREATE
  create(newCarObject) {
    _api
      .post("", newCarObject)
      .then(res => {
        console.log(res.data.data);
        let newCar = new Car(res.data.data);
        let cars = [newCar, ...store.State.cars];
        store.commit("cars", cars);

        this.getCars();
      })
      .catch(err => console.error(err));
    // let newCar = new Car(newCarObject)
    // _store.State.cars.push(newCar)
    // console.log(_store.State.cars)
  }
  constructor() {
    console.log("car service works");
    this.getCars();
  }
}

const CARSERVICE = new CarService();
export default CARSERVICE;
