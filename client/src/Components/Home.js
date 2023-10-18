  import {React,useEffect} from 'react'
  import {useQuery, gql} from '@apollo/client';
  import {LOAD_AVAILABLE_APARTMENTS, LOAD_SHARABLE_APARTMENTS} from '../Graphql/Queries';
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

    const {loading, error, data} = useQuery(LOAD_AVAILABLE_APARTMENTS)
    
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
            <img src="https://images.adsttc.com/media/images/5025/fe30/28ba/0d73/6e00/0007/medium_jpg/stringio.jpg?1414260147" alt="image one"/>
            <div className='caption center-align white-text'>
              <h3>Apartment King</h3>
              <h5 className='light text-lighten-3'>We provide the best Apartments.</h5>
            </div>
            </li>
            <li>
            <img src="https://images.adsttc.com/media/images/59de/ecbb/b22e/3829/2f00/0890/large_jpg/01.jpg?1507781811" alt="image one"/>
            <div className='caption center-align white-text'>
              <h3>Apartment King</h3>
              <h5 className='light text-lighten-3'>We provide the best Apartments.</h5>
            </div>
            </li>
          </ul>
        </div>
        </section>

        {/* For Cards for Apartments*/}
        <h3 className='center-align'>Available Apartments</h3>
        <div className='container row'> 
          {
            data?.available_apartments.map(apartment =>{
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
