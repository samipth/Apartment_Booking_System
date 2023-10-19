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
                apartments: [Apartment]
            }

            type Building{
                building_id: Int!
                building_number: String!
            }
                
            type Apartment{
                apartment_id: Int!
                building_number: String!
                user_id: Int!
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
                users: [User]
            }
                
            type Query{
                users: [User]
                user(id: Int!): User
                buildings: [Building]
                building(id: Int!): Building
                apartments: [Apartment]
                apartment(id: Int!): Apartment
                available_apartments: [Apartment]
                bookeduser_apartments(user_id: Int!): [Apartment]
                notuser_apartments(user_id: Int!): [Apartment]
                bookedapartment_details: [Apartment]
                bookings: [Booking]
                booking(id: Int!): Booking
                user_profile(user_email: String!): User
                sharable_apartments: [Apartment]
            }
                
            type Mutation{
                register(user: AddUser!): User
                login(email: String!, user_password: String!): LoginInfo
                addBuilding(building_number: String!): Building
                addApartment(apartment: AddApartment!): Apartment
                addBooking(booking: AddBooking!): Booking
                deleteApartment(apartment_number: String!): Apartment
                updateBooking(id: Int!, booking: UpdateBooking!): Booking
            }
                
            input AddApartment{
                building_number: String!
                user_id: Int!
                apartment_number: String!
                apartment_size: Int!
                apartment_features: String!
                apartment_type: Apartmenttype!
            }
                
            input AddBuilding{
                building_number: String!
            }
                
            input AddBooking{
                user_id: Int!
                apartment_id: Int!
                booking_start_date: Datetime!
                booking_end_date: Datetime!
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