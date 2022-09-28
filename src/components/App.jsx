import React from "react";
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import css from '../Styles.module.css';
// import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { ImagePendingView } from 'components/ImagePendingView/ImagePandingView';
import { ImageLoadingView } from 'components/ImageLoadingView/ImageLoadingView';
import { ImageErrorView } from 'components/ImageErrorView/ImageErrorView';
import { fetchImages } from 'Servises/Pixabay-api';
import { ButtonLoadMore } from 'components/ButtonLoadMore/ButtonLoadMore';


export class App extends React.Component {
  state = {
    images: {
      hits: [],
      totalHits: '',
      total: '',
    },
    value: '',
    error: null,
    isLoading: false,
    page: 1,
    perPage: 12,
    isLoadMore: true,
  }

  componentDidUpdate(prevProps, prevState) {
    // const searchValue = this.state.value;
    const {value, page, perPage} = this.state
    console.log( 'searchValue =>', value)


    if (prevState.value !== value ||
      prevState.page !== this.state.page) {
    
      this.setState({ isLoading: true, error: null})

      console.log("prevState.page =>", prevState.page);
      console.log("thisState.page =>", page);

      fetchImages(value, page, perPage)
        .then(({ total, totalHits, hits }) => {
          this.setState(prevState => ({
            images: {
              hits: [...prevState.images.hits, ...hits],
              totalHits,
              total,
            },
            isLoading: false,
          
          }));
                


        const totalPages = Math.ceil(totalHits / perPage);
          
        if (hits.length !== 0 && page === 1 ) {
          toast.success(` We found ${totalHits} images.`);
          this.setState({isLoadMore: true,})
        }

        if (page === totalPages) {
          toast.info("The End!");
          this.setState({isLoadMore: false,})
        }


          if (totalHits === 0) {
            return Promise.reject(new Error(`It's sad, but we have a problem! We can't find a "${value}"! Change your request please!`))
          }
        })
        .catch(error => {
          this.setState({ error })
          Promise.reject(new Error(`${error.message}`))
          toast.error(` We can't find a "${value}"! `);
        })
    }
  }

  // отримує значення value від Searchbar
  handleFormSubmit = ({value}) => {
        // console.log('this.state.value =>', this.state.value);
        // console.log('this.state.images =>', this.state.images);
        
    if (value === this.state.value) {
        toast.error("Enter new search value or press 'Load More' !");
        return
      }
    
        return this.setState({
          value, 
          images: {
            hits: [],
            totalHits: '',
            total: '',
        },
          page: 1,
        });
  }

  loadMore = () => { this.setState(prevState => ({ page: prevState.page + 1 }));
    console.log('this.state.page =>', this.state.page)
  };
    
  render() { 
    const {images, error, isLoadMore, isLoading } = this.state
    return ( <div style={{
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center',
                          fontSize: 24,
                          color: '#010101',
                          paddingTop: '80px',
                        }}
      >
      <Searchbar onSubmit={this.handleFormSubmit} />
      
      { images.hits.length !== 0 && <>
        <ImageGallery images={this.state.images.hits } />
        {isLoadMore && <ButtonLoadMore onClick={this.loadMore} />}
      </>
      }
      { images.hits.length === 0 && !isLoading && <ImagePendingView />}
      {isLoading && <ImageLoadingView />}
      {error && <ImageErrorView wrongValue={error.message} />}
      
        <ToastContainer theme="dark" position="bottom-center" autoClose={3000} />
      </div>)
      

  }


}



  // render() {
  //   const { error, status, isLoadMore } = this.state;
    

  //   if (status === 'idle') {
  //     return <>
        // <Searchbar onSubmit={this.handleFormSubmit} />
        // <ImagePendingView />
  //     </>
  //   }

  //   if (status === 'pending') {
  //     return <>
  //     <Searchbar onSubmit={this.handleFormSubmit} />
      // <ImageLoadingView />
  //     </>
  //   }

  //   if (status === 'rejected') {
  //     return <>
  //       <Searchbar onSubmit={this.handleFormSubmit} />
  //       <ImageErrorView wrongValue={error.message} />
  //     </>

  //   }

  //   if (status === 'resolved') {
  //     return ( <div
  //     style={{
  //       display: 'flex',
  //       flexDirection: 'column',
  //       justifyContent: 'center',
  //       alignItems: 'center',
  //       fontSize: 24,
  //       color: '#010101'
  //     }}
  //     >
  //       <Searchbar onSubmit={this.handleFormSubmit} />
  //       <ImageGallery images={this.state.images.hits } />
  //       {isLoadMore && <ButtonLoadMore onClick={this.loadMore} />}
  //       <ToastContainer theme="dark" position="bottom-center" autoClose={3000} />
  //     </div>)
  //   }
  // }




//   state = {
//     value: '',
//   }

  // // отримує значення value від Searchbar
  // handleFormSubmit = ({value}) => {
  //   console.log('this.state.value =>', this.state.value);
  //   console.log('this.state.images =>', this.state.images);
  //   return this.setState({
  //     value, 
  //   });
  // }

//   render() {  return (
    // <div
    //   style={{
    //     display: 'flex',
    //     flexDirection: 'column',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     fontSize: 24,
    //     color: '#010101'
    //   }}
    // >
      // <Searchbar onSubmit={this.handleFormSubmit} />
//       {/* <ToastContainer position="top-center" autoClose={3000}/> */}
    
//       <ImageGallery searchValue={ this.state.value} />
    
      
//     </div>
      
//   );}

// }