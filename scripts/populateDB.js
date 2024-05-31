import mongoose from 'mongoose'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import User from '../models/user.js'
import Housing from '../models/housing.js'
import Rental from '../models/rental.js'
import Address from '../models/address.js'

dotenv.config()

mongoose.connect(process.env.DB_CONNECT_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error al conectar a MongoDB', err))

const calculateTotalCost = (startDate, endDate, price) => {
  const oneDay = 24 * 60 * 60 * 1000
  const diffDays = Math.round(Math.abs((endDate - startDate) / oneDay))
  return diffDays * price
}

const populateDatabase = async () => {
  try {
    // Borra los registros existentes antes de insertar nuevos
    await User.deleteMany({})
    await Housing.deleteMany({})
    await Rental.deleteMany({})
    await Address.deleteMany({})

    // Usuarios
    const saltRounds = 10
    const users = await User.insertMany([
      {
        firstName: 'Carlos',
        lastName: 'Méndez',
        username: 'carlos.mendez',
        email: 'carlos.mendez@gmail.com',
        password: await bcrypt.hash('C@m3nd3z#2024', saltRounds),
        phone: 5512345678,
        role: 'customer'
      },
      {
        firstName: 'María',
        lastName: 'Gómez',
        username: 'maria.gomez',
        email: 'maria.gomez@gmail.com',
        password: await bcrypt.hash('M@ri4Gomez!56', saltRounds),
        phone: 3312345678,
        role: 'customer'
      },
      {
        firstName: 'Juan',
        lastName: 'Pérez',
        username: 'juan.perez',
        email: 'juan.perez@gmail.com',
        password: await bcrypt.hash('Ju@nP3r3z*789', saltRounds),
        phone: 8112345678,
        role: 'customer'
      },
      {
        firstName: 'Ana',
        lastName: 'López',
        username: 'ana.lopez',
        email: 'ana.lopez@gmail.com',
        password: await bcrypt.hash('An@L0pez#456', saltRounds),
        phone: 6641234567,
        role: 'customer'
      },
      {
        firstName: 'Pedro',
        lastName: 'Sánchez',
        username: 'pedro.sanchez',
        email: 'pedro.sanchez@gmail.com',
        password: await bcrypt.hash('P3dr0S@ch3z!789', saltRounds),
        phone: 9981234567,
        role: 'customer'
      },
      {
        firstName: 'Lucia',
        lastName: 'Rodríguez',
        username: 'lucia.rodriguez',
        email: 'lucia.rodriguez@gmail.com',
        password: await bcrypt.hash('Luci@R0dri#123', saltRounds),
        phone: 2221234567,
        role: 'customer'
      },
      {
        firstName: 'José',
        lastName: 'Ramírez',
        username: 'jose.ramirez',
        email: 'jose.ramirez@gmail.com',
        password: await bcrypt.hash('J0seR@m!rez*456', saltRounds),
        phone: 5512545678,
        role: 'customer'
      },
      {
        firstName: 'Marta',
        lastName: 'Días',
        username: 'marta.dias',
        email: 'marta.diaz@gmail.com',
        password: await bcrypt.hash('M@rt4Di@z!123', saltRounds),
        phone: 5512546589,
        role: 'customer'
      },
      {
        firstName: 'Fernando',
        lastName: 'Martínez',
        username: 'fernando.martinez',
        email: 'fernando.martinez@gmail.com',
        password: await bcrypt.hash('F3rn@ndoM@rt!nez', saltRounds),
        phone: 5512545685,
        role: 'customer'
      },
      {
        firstName: 'Claudia',
        lastName: 'García',
        username: 'claudia.garcia',
        email: 'claudia.garcia@gmail.com',
        password: await bcrypt.hash('Cl@udi4Garc!@789', saltRounds),
        phone: 5512545686,
        role: 'customer'
      },
      {
        firstName: 'Ricardo',
        lastName: 'Fernández',
        username: 'ricardo.fernandez',
        email: 'ricardo.fernandez@gmail.com',
        password: await bcrypt.hash('Ric@rd0F3rnand#', saltRounds),
        phone: 5512545687,
        role: 'customer'
      },
      {
        firstName: 'Laura',
        lastName: 'Herrera',
        username: 'laura.herrera',
        email: 'laura.herrera@gmail.com',
        password: await bcrypt.hash('L@ur4H3rr3r@123', saltRounds),
        phone: 5512545688,
        role: 'customer'
      },
      {
        firstName: 'Jorge',
        lastName: 'Gutiérrez',
        username: 'jorge.gutierrez',
        email: 'jorge.gutierrez@gmail.com',
        password: await bcrypt.hash('J0rg3Guti3rr3z!', saltRounds),
        phone: 5512545689,
        role: 'customer'
      },
      {
        firstName: 'Sofia',
        lastName: 'Molina',
        username: 'sofia.molina',
        email: 'sofia.molina@gmail.com',
        password: await bcrypt.hash('S0fi@M0lin@#2024', saltRounds),
        phone: 5512545690,
        role: 'customer'
      },
      {
        firstName: 'Alberto',
        lastName: 'Ruiz',
        username: 'alberto.ruiz',
        email: 'alberto.ruiz@gmail.com',
        password: await bcrypt.hash('Alb3rt0Ru!z*789', saltRounds),
        phone: 5512545691,
        role: 'customer'
      },
      {
        firstName: 'Patricia',
        lastName: 'Morales',
        username: 'patricia.morales',
        email: 'patricia.morales@gmail.com',
        password: await bcrypt.hash('P@trici@Mor@l3s!', saltRounds),
        phone: 5512545692,
        role: 'customer'
      },
      {
        firstName: 'Francisco',
        lastName: 'Muñoz',
        username: 'francisco.munoz',
        email: 'francisco.munoz@gmail.com',
        password: await bcrypt.hash('Fr@ncisc0Mun0z#', saltRounds),
        phone: 5512545693,
        role: 'customer'
      },
      {
        firstName: 'Carolina',
        lastName: 'Álvarez',
        username: 'carolina.alvarez',
        email: 'carolina.alvarez@gmail.com',
        password: await bcrypt.hash('C@rol!n@Alv@r3z', saltRounds),
        phone: 5512545694,
        role: 'customer'
      },
      {
        firstName: 'Cristian',
        lastName: 'Gómez',
        username: 'cristian.gomez',
        email: 'cristian.gierre@gmail.com',
        password: await bcrypt.hash('Cristi4Gierre!56', saltRounds),
        phone: 5512545695,
        role: 'customer'
      },
      {
        firstName: 'Javier',
        lastName: 'Gómez',
        username: 'javier.gierre',
        email: 'javier.gierre@gmail.com',
        password: await bcrypt.hash('J@v3rGierre!56', saltRounds),
        phone: 5512545696,
        role: 'customer'
      }
    ])

    // Direcciones
    const addresses = await Address.insertMany([
      {
        street: 'Extramuros Frances',
        city: 'Baza',
        state: 'Andalucía',
        postalCode: '18800',
        country: 'España'
      },
      {
        street: '7 Carrer Aquari de son Remei',
        city: 'Sant Lluís',
        state: 'Illes Balears',
        postalCode: '07710',
        country: 'España'
      },
      {
        street: 'Calle 14 Norte Bis',
        city: 'Playa del Carmen',
        state: 'Quintana Roo',
        postalCode: '77710',
        country: 'México'
      },
      {
        street: 'Calle 21 Sur con diagonal 85 Sur. Colonia Ejidal',
        city: 'Playa del Carmen',
        state: 'Quintana Roo',
        postalCode: '77712',
        country: 'México'
      },
      {
        street: '106 Calle General PRIM',
        city: 'Ciudad de México',
        state: 'Ciudad de México',
        postalCode: '06600',
        country: 'México'
      },
      {
        street: 'Calle 82445A Colonia Centro',
        city: 'Mérida',
        state: 'Yucatán',
        postalCode: '97000',
        country: 'México'
      },
      {
        street: 'Calle 22 281 Santa Gertudris, Copo',
        city: 'Mérida',
        state: 'Yucatán',
        postalCode: '97300',
        country: 'México'
      },
      {
        street: 'Niños Heroes 120-A',
        city: 'Sayulita',
        state: 'Nayarit',
        postalCode: '63734',
        country: 'México'
      },
      {
        street: 'Paseo de los Volcanes 6',
        city: 'Mazamitla',
        state: 'Jalisco',
        postalCode: '49500',
        country: 'México'
      },
      {
        street: 'San Felipe Carretera a Puertecitos',
        city: 'Don Pancho',
        state: 'Baja California',
        postalCode: '21850',
        country: 'México'
      },
      {
        street: 'Loma Blanca',
        city: 'Mazamitla',
        state: 'Jalisco',
        postalCode: '49500',
        country: 'México'
      },
      {
        street: 'Calle 17 No. 818 entre 140 y 138',
        city: 'Chelem',
        state: 'Yucatán',
        postalCode: '97336',
        country: 'México'
      },
      {
        street: 'Corredor Mar de Cortez',
        city: 'La Ventana',
        state: 'Baja California Sur',
        postalCode: '23232',
        country: 'México'
      },
      {
        street: 'Avenida Francisco Medina Ascencio Zona Hotelera Norte Condominio Los Tules departamento 13-401',
        city: 'Puerto Vallarta',
        state: 'Jalisco',
        postalCode: '48333',
        country: 'México'
      },
      {
        street: 'Camino Agua Blanca',
        city: 'Santa María Tonameca',
        state: 'Oaxaca',
        postalCode: '70944',
        country: 'México'
      },
      {
        street: '7 Calle Geminis Sur Centro Tulum',
        city: 'Tulum',
        state: 'Quintana Roo',
        postalCode: '77760',
        country: 'México'
      },
      {
        street: 'Calle 25 por 60 y 62',
        city: 'San Crisanto',
        state: 'Yucatán',
        postalCode: '97242',
        country: 'México'
      },
      {
        street: 'Colonia Los Saucos Carretera Federal',
        city: 'Mesa de Palomas',
        state: 'Chihuahua',
        postalCode: '51200',
        country: 'México'
      },
      {
        street: 'Fontana Bella',
        city: 'Avándaro',
        state: 'Estado de México',
        postalCode: '51200',
        country: 'México'
      },
      {
        street: 'Carretera a Cinco Lagos KM 2',
        city: 'Santiago',
        state: 'Ciudad de México',
        postalCode: '30160',
        country: 'México'
      }
    ])

    // Viviendas
    const housings = await Housing.insertMany([
      {
        name: 'Casa natural en Baza, España',
        type: 'Casa',
        environment: 'Desierto',
        price: 120,
        description: 'Una casa cueva perdida en medio de un paisaje desértico.',
        address: addresses[0]._id,
        bedrooms: 5,
        bathrooms: 2
      },
      {
        name: 'Villa en Sant Lluís, España',
        type: 'Villa',
        environment: 'Playa',
        price: 600,
        description: 'Hermosa casa de arquitectura moderna con vistas al mar, a 5 minutos de la playa de Punta Prima, la ciudad de Sant Lluís, a 15 minutos de Mahón y el aeropuerto.',
        address: addresses[1]._id,
        bedrooms: 4,
        bathrooms: 3
      },
      {
        name: 'Apartamento cómodo y céntrico',
        type: 'Apartamento',
        environment: 'Ciudad',
        price: 60,
        description: 'Cómodo y Céntrico Apartamento PDC ofrece piscina al aire libre y centro de fitness, además de terraza, y se encuentra en el centro de Playa del Carmen, a 9 min a pie de Playa de Playa del Carmen.',
        address: addresses[2]._id,
        bedrooms: 1,
        bathrooms: 1
      },
      {
        name: 'Condo Casa del Árbol',
        type: 'Casa',
        environment: 'Ciudad',
        price: 40,
        description: 'Condo Casa del Árbol está a 2,6 km de Estación internacional de autobús ADO y ofrece alojamiento con piscina al aire libre, jardín y recepción 24 horas. Hay wifi gratis en todo el alojamiento.',
        address: addresses[3]._id,
        bedrooms: 1,
        bathrooms: 1
      },
      {
        name: 'MC Suites Mexico City',
        type: 'Apartamento',
        environment: 'Ciudad',
        price: 70,
        description: 'Ubicado en el barrio de Reforma, a 1.8km del Museo Memoria y Tolerancia, a 16 min a pie del Museo de Arte Popular y a 1.4km del monumento a la independencia.',
        address: addresses[4]._id,
        bedrooms: 1,
        bathrooms: 1
      },
      {
        name: 'Loft 82',
        type: 'Casa',
        environment: 'Ciudad',
        price: 20,
        description: 'Situado en el centro de Mérida, dispone de patio y WiFi gratis, cuenta con aire acondicionado.',
        address: addresses[5]._id,
        bedrooms: 1,
        bathrooms: 1
      },
      {
        name: 'Apartamento Torre Onze',
        type: 'Apartamento',
        environment: 'Ciudad',
        price: 40,
        description: 'Cuenta con piscina al aire libre, centro fitness y jardín, ofrece alojamiento en Mérida con WiFi gratis y vistas a la ciudad, y se encuentra a 5.8km del gran Museo del Mundo Maya.',
        address: addresses[6]._id,
        bedrooms: 1,
        bathrooms: 1
      },
      {
        name: 'Casa Makawe',
        type: 'Casa',
        environment: 'Playa',
        price: 160,
        description: 'Casa Makawe ONLY ADULTS está en Sayulita y dispone de wifi gratis, piscina de temporada al aire libre, salón de uso común y terraza. Hay parking privado en el propio alojamiento.',
        address: addresses[7]._id,
        bedrooms: 1,
        bathrooms: 1
      },
      {
        name: 'Cabaña Mazzalt',
        type: 'Cabaña',
        environment: 'Bosque',
        price: 130,
        description: 'Cabañas Mazzatl 6 pax se encuentra en Mazamitla y ofrece jardín y bar. Este chalet de montaña ofrece parking privado gratis, recepción 24 horas y wifi gratis.',
        address: addresses[8]._id,
        bedrooms: 2,
        bathrooms: 2
      },
      {
        name: 'Tortugas Bay MX',
        type: 'Casa',
        environment: 'Playa',
        price: 160,
        description: 'Tortugas Bay, MX ofrece alojamiento con piscina al aire libre, wifi gratis y parking privado gratis en Don Pancho.',
        address: addresses[9]._id,
        bedrooms: 3,
        bathrooms: 2
      },
      {
        name: 'Cabañas VIP Mazamitla',
        type: 'Cabaña',
        environment: 'Bosque',
        price: 100,
        description: 'Cabañas VIP Mazamitla se encuentra en Mazamitla, en la región de Jalisco. Ofrece alojamiento con parking privado gratis y acceso a la bañera de hidromasaje. El alojamiento dispone de bañera de hidromasaje.',
        address: addresses[10]._id,
        bedrooms: 1,
        bathrooms: 1
      },
      {
        name: 'El Paraíso de Capitán Fernando',
        type: 'Apartamento',
        environment: 'Playa',
        price: 130,
        description: 'El Paraíso de Capitán Fernando está en Chelem y ofrece alojamiento con terraza o balcón, wifi gratis y TV, además de bicicletas gratis y piscina al aire libre. Hay parking privado en el propio alojamiento.',
        address: addresses[11]._id,
        bedrooms: 1,
        bathrooms: 1
      },
      {
        name: 'Beach Front Lofts, La Ventana',
        type: 'Apartamento',
        environment: 'Playa',
        price: 240,
        description: 'Beach Front Lofts, La Ventana ofrece alojamiento con piscina al aire libre, wifi gratis y parking privado gratis en La Ventana.',
        address: addresses[12]._id,
        bedrooms: 1,
        bathrooms: 1
      },
      {
        name: 'Hermoso alojamiento en Los Tules, frente al mar',
        type: 'Villa',
        environment: 'Playa',
        price: 300,
        description: 'La Villa Los Tules con 7 albercas a 50 pasos de la Playa se encuentra en Puerto Vallarta, a 2,4 km de la playa de Marina Vallarta, y ofrece restaurante, aparcamiento privado gratuito, piscina al aire libre y bar. El establecimiento se encuentra a 2 km del muelle de cruceros y a 7 km del centro internacional de convenciones de Puerto Vallarta y ofrece un balcón con vistas al jardín y una pista de tenis. Ofrece recepción 24 horas, servicio de enlace con el aeropuerto, servicio de habitaciones y WiFi gratuita.',
        address: addresses[13]._id,
        bedrooms: 2,
        bathrooms: 1
      },
      {
        name: 'Utopia Beach House and Suites',
        type: 'Casa',
        environment: 'Playa',
        price: 90,
        description: 'Utopia Beach House & Suites tiene vistas al jardín, wifi gratis y parking privado gratis. Está en Santa María Tonameca, a 2 min a pie de Playa de Agua Blanca.',
        address: addresses[14]._id,
        bedrooms: 1,
        bathrooms: 1
      },
      {
        name: 'Casa Elda',
        type: 'Casa',
        environment: 'Playa',
        price: 90,
        description: 'Casa Elda está en Tulum y ofrece vistas a la piscina, piscina al aire libre, jardín, salón de uso común, terraza y zona de barbacoa. Hay wifi gratis.',
        address: addresses[15]._id,
        bedrooms: 1,
        bathrooms: 1
      },
      {
        name: 'Unique Beachfront Casa Kyma',
        type: 'Casa',
        environment: 'Playa',
        price: 660,
        description: 'Unique Beachfront Casa Kyma, Pool, San Crisanto, Yucatán, que cuenta con piscina al aire libre, jardín y terraza, ofrece alojamiento en San Crisanto con wifi gratis y vistas al mar. Este alojamiento frente a la playa ofrece parking privado gratis y acceso a un balcón.',
        address: addresses[16]._id,
        bedrooms: 3,
        bathrooms: 4
      },
      {
        name: 'Cabaña Los Saucos',
        type: 'Cabaña',
        environment: 'Bosque',
        price: 120,
        description: 'Cabañas Los Saucos se encuentra a 21 km de Cascadas Velo de Novia y ofrece alojamiento conjardín, restaurante y servicio de habitaciones. En el chalet de montaña, tanto el wifi como el parking privado son gratis.',
        address: addresses[17]._id,
        bedrooms: 1,
        bathrooms: 1
      },
      {
        name: 'Cabaña en el corazón de Avandaro',
        type: 'Cabaña',
        environment: 'Bosque',
        price: 220,
        description: 'Cabaña en el corazón de Avandaro, que está en Avándaro, ofrece alojamiento con patio. Esta casa o chalet dispone de jardín, zona de barbacoa, wifi gratis y parking privado gratis.',
        address: addresses[18]._id,
        bedrooms: 3,
        bathrooms: 1
      },
      {
        name: 'Cabañas Cinco Lagos',
        type: 'Cabaña',
        environment: 'Bosque',
        price: 80,
        description: 'Todos los alojamientos disponen de TV vía satélite de pantalla plana. Algunos cuentan con terraza y/o balcón con vistas al lago. Además, se proporcionan toallas.',
        address: addresses[19]._id,
        bedrooms: 2,
        bathrooms: 1
      }
    ])

    // Alquileres
    await Rental.insertMany([
      {
        provider: users[0]._id,
        customer: users[1]._id,
        housing: housings[0]._id,
        startDate: new Date('2024-06-01'),
        endDate: new Date('2024-06-07'),
        totalCost: calculateTotalCost(new Date('2024-06-02'), new Date('2024-06-07'), housings[0].price)
      },
      {
        provider: users[1]._id,
        customer: users[2]._id,
        housing: housings[1]._id,
        startDate: new Date('2024-06-02'),
        endDate: new Date('2024-06-08'),
        totalCost: calculateTotalCost(new Date('2024-06-01'), new Date('2024-06-06'), housings[1].price)
      },
      {
        provider: users[2]._id,
        customer: users[3]._id,
        housing: housings[2]._id,
        startDate: new Date('2024-06-14'),
        endDate: new Date('2024-06-19'),
        totalCost: calculateTotalCost(new Date('2024-06-14'), new Date('2024-06-19'), housings[2].price)
      },
      {
        provider: users[3]._id,
        customer: users[4]._id,
        housing: housings[3]._id,
        startDate: new Date('2024-06-20'),
        endDate: new Date('2024-06-25'),
        totalCost: calculateTotalCost(new Date('2024-06-20'), new Date('2024-06-25'), housings[3].price)
      },
      {
        provider: users[4]._id,
        customer: users[5]._id,
        housing: housings[4]._id,
        startDate: new Date('2024-06-26'),
        endDate: new Date('2024-07-01'),
        totalCost: calculateTotalCost(new Date('2024-06-26'), new Date('2024-07-01'), housings[4].price)
      },
      {
        provider: users[5]._id,
        customer: users[6]._id,
        housing: housings[5]._id,
        startDate: new Date('2024-07-02'),
        endDate: new Date('2024-07-07'),
        totalCost: calculateTotalCost(new Date('2024-07-02'), new Date('2024-07-07'), housings[5].price)
      },
      {
        provider: users[6]._id,
        customer: users[7]._id,
        housing: housings[6]._id,
        startDate: new Date('2024-07-08'),
        endDate: new Date('2024-07-13'),
        totalCost: calculateTotalCost(new Date('2024-07-08'), new Date('2024-07-13'), housings[6].price)
      },
      {
        provider: users[7]._id,
        customer: users[8]._id,
        housing: housings[7]._id,
        startDate: new Date('2024-07-14'),
        endDate: new Date('2024-07-19'),
        totalCost: calculateTotalCost(new Date('2024-07-14'), new Date('2024-07-19'), housings[7].price)
      },
      {
        provider: users[8]._id,
        customer: users[9]._id,
        housing: housings[8]._id,
        startDate: new Date('2024-07-20'),
        endDate: new Date('2024-07-25'),
        totalCost: calculateTotalCost(new Date('2024-07-20'), new Date('2024-07-25'), housings[8].price)
      },
      {
        provider: users[9]._id,
        customer: users[10]._id,
        housing: housings[9]._id,
        startDate: new Date('2024-07-26'),
        endDate: new Date('2024-07-31'),
        totalCost: calculateTotalCost(new Date('2024-07-26'), new Date('2024-07-31'), housings[9].price)
      },
      {
        provider: users[10]._id,
        customer: users[11]._id,
        housing: housings[10]._id,
        startDate: new Date('2024-06-01'),
        endDate: new Date('2024-06-05'),
        totalCost: calculateTotalCost(new Date('2024-06-01'), new Date('2024-06-05'), housings[10].price)
      },
      {
        provider: users[11]._id,
        customer: users[12]._id,
        housing: housings[11]._id,
        startDate: new Date('2024-06-06'),
        endDate: new Date('2024-06-10'),
        totalCost: calculateTotalCost(new Date('2024-06-06'), new Date('2024-06-10'), housings[11].price)
      },
      {
        provider: users[12]._id,
        customer: users[13]._id,
        housing: housings[12]._id,
        startDate: new Date('2024-06-11'),
        endDate: new Date('2024-06-15'),
        totalCost: calculateTotalCost(new Date('2024-06-11'), new Date('2024-06-15'), housings[12].price)
      },
      {
        provider: users[13]._id,
        customer: users[14]._id,
        housing: housings[13]._id,
        startDate: new Date('2024-06-16'),
        endDate: new Date('2024-06-20'),
        totalCost: calculateTotalCost(new Date('2024-06-16'), new Date('2024-06-20'), housings[13].price)
      },
      {
        provider: users[14]._id,
        customer: users[15]._id,
        housing: housings[14]._id,
        startDate: new Date('2024-06-21'),
        endDate: new Date('2024-06-25'),
        totalCost: calculateTotalCost(new Date('2024-06-21'), new Date('2024-06-25'), housings[14].price)
      },
      {
        provider: users[15]._id,
        customer: users[16]._id,
        housing: housings[15]._id,
        startDate: new Date('2024-06-26'),
        endDate: new Date('2024-06-30'),
        totalCost: calculateTotalCost(new Date('2024-06-26'), new Date('2024-06-30'), housings[15].price)
      },
      {
        provider: users[16]._id,
        customer: users[17]._id,
        housing: housings[16]._id,
        startDate: new Date('2024-07-01'),
        endDate: new Date('2024-07-05'),
        totalCost: calculateTotalCost(new Date('2024-07-01'), new Date('2024-07-05'), housings[16].price)
      },
      {
        provider: users[17]._id,
        customer: users[18]._id,
        housing: housings[17]._id,
        startDate: new Date('2024-07-06'),
        endDate: new Date('2024-07-10'),
        totalCost: calculateTotalCost(new Date('2024-07-06'), new Date('2024-07-10'), housings[17].price)
      },
      {
        provider: users[18]._id,
        customer: users[19]._id,
        housing: housings[18]._id,
        startDate: new Date('2024-07-11'),
        endDate: new Date('2024-07-15'),
        totalCost: calculateTotalCost(new Date('2024-07-11'), new Date('2024-07-15'), housings[18].price)
      },
      {
        provider: users[19]._id,
        customer: users[0]._id,
        housing: housings[19]._id,
        startDate: new Date('2024-07-16'),
        endDate: new Date('2024-07-20'),
        totalCost: calculateTotalCost(new Date('2024-07-16'), new Date('2024-07-20'), housings[19].price)
      }
    ])

    console.log('Base de datos poblada con éxito')
  } catch (error) {
    console.error('Error al poblar la base de datos:', error)
  } finally {
    await mongoose.disconnect()
  }
}

populateDatabase()
