  import {React,useEffect} from 'react'
  import {useQuery, gql} from '@apollo/client';
  import {LOAD_AVAILABLE_APARTMENTS, LOAD_SHARABLE_APARTMENTS, NOTUSER_APARTMENTS} from '../Graphql/Queries';
  import { Link } from 'react-router-dom';

  function Home() { 

    useEffect(() => {
      // Check if the user is coming from the login page
      const fromLoginPage = localStorage.getItem('fromNav') === 'true';
  
      if (fromLoginPage) {
        // Clear the flag
        localStorage.removeItem('fromNav');
  
        // Refresh the page
        window.location.reload();
      }
    }, []);

    const query = localStorage.getItem("token") ? NOTUSER_APARTMENTS : LOAD_AVAILABLE_APARTMENTS;
    
    const {loading, error, data} = useQuery(query,{
      variables: {
        user_id: parseInt(localStorage.getItem("user_id"))
      }
    })
    
    const { loading: loadingApartments, error: errorApartments, data: dataApartments } = useQuery(LOAD_SHARABLE_APARTMENTS);

    if(error){
      console.log(error.message)
    }

    return (
      <div>
        {/* <blockquote>Hello, I am homepage.</blockquote> */}

        {/* For sliders */}
        <section className='fslider'>
        <div className="slider">
          
          <ul className='slides'> 
            <li>
            <img src="https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?cs=srgb&dl=pexels-files-1648776.jpg&fm=jpg" alt="image one"/>
            <div className='caption center-align white-text'>
              <h3>Apartment King</h3>
              <h5 className='light text-lighten-3'>We provide the best Apartments.</h5>
            </div>
            </li>
            <li>
            <img src="https://images.adsttc.com/media/images/59de/ecbb/b22e/3829/2f00/0890/large_jpg/01.jpg?1507781811" alt="image one"/>
            <div className='caption center-align white-text'>
              <h3>Are you ready to book?</h3>
              <h5 className='light text-lighten-3'>Come on.</h5>
            </div>
            </li>
          </ul>
        </div>
        </section>

        <section className='description'>
          <div className = "section white center">
            <h2 className = "header">Apartment King</h2>
            <div className= 'row container center'>
              <div className = 'col center l8 s12'>
              <blockquote>Discover the future of hassle-free apartment rentals with our cutting-edge Apartment 
              Booking System. Whether you're a property owner seeking streamlined management or a tenant
              in pursuit of the perfect living space, our platform is designed with you in mind. Explore
              detailed property listings, secure your dream apartment effortlessly, and enjoy the transparency
              of real-time availability, online payments, and user reviews. Embrace efficiency and trust in
              your rental journey. Start exploring today!</blockquote>
              </div>
              <div className= 'col center l4 s12'>
                <img src ="https://images.vexels.com/media/users/3/157612/isolated/preview/b8c07826c517b2acde8e31979b7a0529-tall-apartment-icon.png" style={{objectFit: 'contain'}} height={200} width={'auto'} alt=""/>
              </div>
            </div>
          </div>
        </section>

        {/* For Cards for Apartments*/}
        <h3 className='center-align'>Available Apartments</h3>
        <div className='container row'> 
          {
            data?.user.map(apartment =>{
              return (
                      <section className='fcards col l4'>
                      <div className="row">
                        <div className="">
                        <div className="card">
                            <div className="card-image waves-effect waves-block waves-light">
                              <img className="activator" src="https://media.istockphoto.com/id/1365649825/photo/stylish-micro-apartment-for-one.jpg?s=2048x2048&w=is&k=20&c=SEjWOYBNNQ3Y4w_wn6Go4wPwhZkwoH8etv4g02dWFl4="/>
                            </div>
                            <div className="card-content">
                              <span className="card-title activator grey-text text-darken-4">{apartment?.apartment_number}<i class="material-icons right">Description</i></span>
                              <Link to = "/login"><p>Book Now!!</p></Link>
                            </div>
                            <div className="card-reveal">
                              <span className="card-title grey-text text-darken-4" >Description<i className="material-icons right">close</i></span>
                              <p>{apartment?.apartment_features}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
              )
            })
          }
        </div>

        {/* For Cards for sharable Apartments */}
        <h3 className='center-align'>Sharable Apartments</h3>
        <div className='container row'> 
          {
            dataApartments?.sharable_apartments.map(apartment =>{
              return (
                      <section className='fcards col l4'>
                      <div className="row">
                        <div className="">
                        <div className="card">
                            <div className="card-image waves-effect waves-block waves-light">
                              <img className="activator" src="https://media.istockphoto.com/id/1365649825/photo/stylish-micro-apartment-for-one.jpg?s=2048x2048&w=is&k=20&c=SEjWOYBNNQ3Y4w_wn6Go4wPwhZkwoH8etv4g02dWFl4="/>
                            </div>
                            <div className="card-content">
                              <span className="card-title activator grey-text text-darken-4">{apartment?.apartment_number}<i class="material-icons right">Description</i></span>
                              <Link to = "/login"><p>Book Now!!</p></Link>
                            </div>
                            <div className="card-reveal">
                              <span className="card-title grey-text text-darken-4" >Description<i className="material-icons right">close</i></span>
                              <p>{apartment?.apartment_features}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
              )
            })
          }
        </div>


      </div>
    )
  }

  export default Home;
