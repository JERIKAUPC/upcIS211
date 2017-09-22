# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# ------
# Access Form
# -----
AccessForm.destroy_all

AccessForm.create([
  {
    name: "Entrega de control automatico"
  },
  {
    name: "Con portero"
  },
  {
    name: "Yo abriré personalmente"
  }
])


# ------
# Vehicle Types
# -----
VehicleType.destroy_all

VehicleType.create([
  {
    name: "Moto",
    icon_class: "icon-parking-motocicleta",
    icon_image: nil,
    order: 1
  },
  {
    name: "Pequeño",
    icon_class: "icon-parking-small",
    icon_image: nil,
    order: 2
  },
  {
    name: "Mediano",
    icon_class: "icon-parking-medium",
    icon_image: nil,
    order: 3
  },
  {
    name: "Grande",
    icon_class: "icon-parking-large",
    icon_image: nil,
    order: 4
  },
  {
    name: "SUV",
    icon_class: "icon-parking-suv",
    icon_image: nil,
    order: 5
  },
  {
    name: "Van",
    icon_class: "icon-parking-van",
    icon_image: nil,
    order: 6
  },
  {
    name: "Camión",
    icon_class: "icon-parking-camion",
    icon_image: nil,
    order: 7
  },
  {
    name: "Trailer",
    icon_class: "icon-parking-trailer",
    icon_image: nil,
    order: 8
  }
])


# ------
# Access Form
# -----
PropertyType.destroy_all

PropertyType.create([
  {
    name: "En frente de portón",
    icon_class: nil,
    icon_image: "assets/frente-a-garage.png"
  },
  {
    name: "Casa Privada",
    icon_class: "icon-parking-home",
    icon_image: nil
  },
  {
    name: "Edificio Habitacional",
    icon_class: "icon-parking-habitacional",
    icon_image: nil
  },
  {
    name: "Hotel",
    icon_class: "icon-parking-hotel",
    icon_image: nil
  },
  {
    name: "Terreno",
    icon_class: "icon-parking-terreno",
    icon_image: nil
  },
  {
    name: "Oficinas",
    icon_class: "icon-parking-oficinas",
    icon_image: nil
  },
  {
    name: "Institución",
    icon_class: "icon-parking-institucion",
    icon_image: nil
  },
  {
    name: "Estacionamiento Publico",
    icon_class: "icon-parking-estacionamiento",
    icon_image: nil
  }
])

