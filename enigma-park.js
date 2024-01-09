class Car {
    constructor(nopol, pemilik) {
        this.nopol = nopol;
        this.pemilik = pemilik;
    }
}

class ParkingLot {
    constructor(capacity) {
        this.capacity = capacity;
        this.remaining = capacity;
        this.cars = [];
    }

    park(car) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (this.remaining > 0) {
                    if (!this.cars.find((c) => c.nopol === car.nopol)) {
                        this.cars.push(car);
                        this.remaining -= 1;
                        resolve(console.log(`Mobil ${car.pemilik} dengan Nopol ${car.nopol} berhasil parkir.`));
                    } else reject(`Mobil ${car.pemilik} dengan Nopol ${car.nopol} sudah parkir sebelumnya.`);
                } else reject("Mohon maaf, parkir sudah penuh.");
            }, 3000);
        });
    }

    leave(nopol) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const car = this.cars.find((car) => car.nopol === nopol);
                if (car) {
                    const index = this.cars.indexOf(car);
                    this.cars.splice(index, 1);
                    this.remaining += 1;
                    resolve(console.log(`Mobil ${car.pemilik} dengan Nopol ${nopol} berhasil keluar.`));
                } else reject(`Mobil dengan nopol ${nopol} tidak ada atau sudah keluar.`);
            }, 1500);
        });
    }

    check() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(console.log(`{ capacity: ${this.capacity}, remaining: ${this.remaining}, parkedCars: [${this.cars.map((car) => car.nopol).join(", ")}] }`));
                // resolve(console.log(`{ capacity: ${this.capacity}, remaining: ${this.remaining}, parkedCars: [${JSON.stringify(this.cars)}`));
            }, 500);
        });
    }
}

function createPark(capacity) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (isNaN(capacity)) {
                reject('Tempat parkir tidak berhasil dibuat, karena kapasitas bukan berupa angka.');
            } else {
                const parkingLot = new ParkingLot(capacity);
                resolve(parkingLot);
                console.log(`Tempat parkir berhasil dibuat dengan kapasitas ${capacity} kendaraan.`);
            }
        }, 5000);
    });
}

async function main() {
    let enigmapark
    try {
        enigmapark = await createPark(3);
        await enigmapark.park(new Car("B2021", "Alex"));
        await enigmapark.check();
        await enigmapark.park(new Car("B2019", "Blex"));
        await enigmapark.leave("B2021");
        await enigmapark.park(new Car("B2020", "Clex"));
        await enigmapark.park(new Car("B2023", "Dlex"));
        await enigmapark.leave("B2019");
        await enigmapark.park(new Car("B2024", "Alex"));
        await enigmapark.park(new Car("B2021", "Blex")); // Program akan berhenti karena tidak bisa memnuhi permintaan yang diinginkan
        await enigmapark.leave("B2021");
        await enigmapark.check();
        await enigmapark.leave("B2024");
        await enigmapark.check();
    } catch (error) {
        console.log(error);
        if (enigmapark === undefined) {
            console.log("Silahkan isi ulang kapasitas dengan angka.");
        } else {
            await enigmapark.check();
        }
    }
}

main();