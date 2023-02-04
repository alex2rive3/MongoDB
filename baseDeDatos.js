const { MongoClient, ObjectId } = require('mongodb')

const dataBase = "my_first_db";
const collectionName = "estudiantes";

async function createOneDocument(client, newDoc) {
    const result = await client.db(dataBase).collection(collectionName).insertOne(newDoc);
    result ? console.log(`list created with the following id: ${result.insertedId}`) : console.log("Ha ocurrido un error");
}
async function createMultipleDocument(client, newDoc) {
    const result = await client.db(dataBase).collection(collectionName).insertMany(newDoc);
    result ? console.log(`${result.insertedCount} lists created with the following id: ${result.insertedId}`) : console.log("Ha ocurrido un error");
}


async function allDataCollection(client) {
    const result = await client.db(dataBase).collection(collectionName).find({});

    console.log("All Data :");
    if (result) {
        const cursor = await result.toArray();
        cursor.forEach(data => {
            console.log(data)
        });
    } else {
        console.log("Base de Datos Vacio");
    };
};

//dataObjt es el parametro para buscar 
async function searchOneData(client, dataObjt) {
    const res = await client.db(dataBase).collection(collectionName).findOne(dataObjt);

    console.log(`Data Search:`);
    if (res) {
        console.log(res)
    } else {
        console.log("No se encontro lo que se buscaba");
    };
};
//le damos la clave del objetos y dos datos que querramos buscar 
//esto duvuelve los datos que coinsidan con los parametos
async function searchHomeState(client, city1, city2) {
    const query = { home_state: { $in: [city1, city2] } };
    const result = await client.db(dataBase).collection(collectionName).find(query);

    console.log("Data HomeState:");
    if (result) {
        const cursor = await result.toArray();
        cursor.forEach(data => {
            console.log(data)
        });
    } else {
        console.log("Dato no encontrado");
    };
}
async function searchLuckyNumberBigger(client, lukyNumber) {
    if (!isNaN(lukyNumber)) {
        const result = await client.db(dataBase).collection(collectionName).find({
            lucky_number: { $gt: lukyNumber }
        })
        if (result) {
            const cursor = await result.toArray();
            cursor.forEach(data => {
                console.log(data)
            });
        } else {
            console.log("Dato no encontrado");
        };
    } else {
        console.log("Este parametros obligatoriamente debe ser un numero");
    }
}
async function searchLuckyNumberSmaller(client, lukyNumber) {
    if (!isNaN(lukyNumber)) {
        console.log("Lucky number Smaller:");
        const result = await client.db(dataBase).collection(collectionName).find({
            lucky_number: { $lte: lukyNumber }
        })
        if (result) {
            const cursor = await result.toArray();
            cursor.forEach(data => {
                console.log(data)
            });
        } else {
            console.log("Dato no encontrado");
        };
    } else {
        console.log("Este parametros obligatoriamente debe ser un numero");
    }
}
async function searchLuckyNumberRange(client, rangeSmaller, rangeBigger) {
    if (!isNaN(rangeSmaller) && !isNaN(rangeBigger)) {
        console.log("Lucky number Range:");
        const result = await client.db(dataBase).collection(collectionName).find({
            lucky_number: {
                $gte: rangeSmaller,
                $lte: rangeBigger
            }
        })
        if (result) {
            const cursor = await result.toArray();
            cursor.forEach(data => {
                console.log(data)
            });
        } else {
            console.log("Dato no encontrado");
        };
    } else {
        console.log("Este parametros obligatoriamente debe ser un numero");
    }
}

async function addAField(client, ArrNew) {
    const result = await client.db(dataBase).collection(collectionName)
        //en esta linea vemos que intereses no existe y en la siguiente usamos un set para agregar la propiedad y no sobre escribir todo el objeto
        .updateMany({ interes: { $exists: false } },
            { $set: { interes: ArrNew } });
    console.log(`${result.modifiedCount} documentos modificados`)
}

async function addInterest(client, searchName, newInterest) {
    const res = await client.db(dataBase).collection(collectionName).updateOne({ name: searchName }, { $push: { interes: newInterest } })
    console.log(res);
    res.modifiedCount !== 0 ? console.log("Cambio realizado") : console.log("Ha ocurrido un error")
}

async function deleteForName(client, deleteName) {
    const result = await client.db(dataBase).collection(collectionName).deleteOne({ name: deleteName })
    console.log(`${result.deletedCount} Dato Eliminado `);
}

async function deleteForHomeState(client, deleteHomeState) {
    const result = await client.db(dataBase).collection(collectionName).deleteMany({ home_state: deleteHomeState })
    console.log(`${result.deletedCount} Dato Eliminado `);
}

async function main() {
    const uri = "mongodb://127.0.0.1:27017?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    try {
        // Connect to the MongoDB cluster
        await client.connect();
        await deleteForHomeState(client, "California");
        //await searchHomeState(client, "California", "Washington")
        await allDataCollection(client);
        //await searchOneData(client, { "name": "Rodrigo" });
    } catch (e) {
        console.error(e);
    } finally {
        await client.close()
    };
}
main().catch(console.error);


