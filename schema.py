from ariadne import gql

type_defs = gql("""

            scalar Datetime
                
            enum Usertype{
                Provider
                Client
            }
                
            enum Apartmenttype{
                Sharable
                Non_Sharable
            }
            type User{
                user_id: Int!
                user_name: String!
                user_phone: String!
                user_email: String!
                user_birth_date: Datetime!
                role: Usertype!
                buildings: [Building]
            }

            type Building{
                building_id: Int!
                user_id: Int!
                num_rooms: Int!
                building_location: String!
            }
                
            type Apartment{
                apartment_id: Int!
                building_id: Int!
                apartment_number: String!
                apartment_size: Int!
                apartment_features: String!
                apartment_isbooked: Boolean!
                apartment_type: Apartmenttype!
            }
                
            type Booking{
                booking_id: Int!
                user_id: Int!
                apartment_id: Int!
                booking_start_date: Datetime!
                booking_end_date: Datetime!
                created_at: Datetime!
            }
                
            type Query{
                users: [User]
                user(id: Int!): User
                buildings: [Building]
                building(id: Int!): Building
                apartments: [Apartment]
                apartment(id: Int!): Apartment
                available_apartments: [Apartment]
                bookings: [Booking]
                booking(id: Int!): Booking
                user_profile(user_email: String!): User
                sharable_apartments: [Apartment]
            }
                
            type Mutation{
                register(user: AddUser!): User
                login(email: String!, user_password: String!): LoginInfo
                addBuilding(building: AddBuilding!): Building
                addApartment(apartment: AddApartment!): Apartment
                addBooking(booking: AddBooking!): Booking
                deleteBuilding(id: Int!): Building
                updateBooking(id: Int!, booking: UpdateBooking!): Booking
                updateBuilding(id: Int!, building: UpdateBuilding): Building
            }
                
            input AddApartment{
                building_id: Int!
                apartment_number: String!
                apartment_size: Int!
                apartment_features: String!
                apartment_isbooked: Boolean!
                apartment_type: Apartmenttype!
            }
                
            input AddBuilding{
                user_id: Int!
                num_rooms: Int!
                building_location: String!
            }
                
            input AddBooking{
                user_id: Int!
                apartment_id: Int!
                booking_start_date: Datetime!
                booking_end_date: Datetime!
            }
                
            input UpdateBuilding{
                user_id: Int
                num_rooms: Int
            }
            
            input UpdateBooking{
                booking_end_date: Datetime!
            }
                    
            type LoginInfo{
                email: String!
                token: String!   
            }
                
            input AddUser{
                user_name: String!
                user_birth_date: Datetime!
                user_phone: String!
                user_email: String!
                role: Usertype!
                user_password: String!   
            }                            
""")