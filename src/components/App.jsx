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
    status: 'idle',
    page: 1,
    perPage: 20,
    isLoadMore: true,
  }

  componentDidUpdate(prevProps, prevState) {
    // const searchValue = this.state.value;
    const {value, page, perPage} = this.state
    console.log( 'searchValue =>', value)


    if (prevState.value !== value ||
      prevState.page !== this.state.page) {
      this.setState({status: 'pending'});

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
            status: 'resolved',
          }));
                

        const totalPages = Math.ceil(totalHits / perPage);


        if (page === 1) {
          toast.success(` We found ${totalHits} images.`);
          this.setState({isLoadMore: true,})
        }

        if (page === totalPages) {
          toast.info("The End!");
          this.setState({isLoadMore: false,})
        }


          if (total === 0) {
            this.setState({ status: 'rejected' })
            return Promise.reject(new Error(`It's sad, but we have a problem! We can't find a ${value}! Change it please!`))
          }
        })
        .catch(error => this.setState({ error, status: 'rejected' }))
    }
  }

  // отримує значення value від Searchbar
  handleFormSubmit = ({value}) => {
        // console.log('this.state.value =>', this.state.value);
        // console.log('this.state.images =>', this.state.images);
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

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
    console.log('this.state.page =>', this.state.page)
  };
    
  render() {
    const { error, status, isLoadMore } = this.state;
    

    if (status === 'idle') {
      return <>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImagePendingView />
      </>
    }

    if (status === 'pending') {
      return <>
      <Searchbar onSubmit={this.handleFormSubmit} />
      <ImageLoadingView />
      </>
    }

    if (status === 'rejected') {
      return <>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageErrorView wrongValue={error.message} />
      </>

    }

    if (status === 'resolved') {
      return ( <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 24,
        color: '#010101'
      }}
      >
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery images={this.state.images.hits } />
        {isLoadMore && <ButtonLoadMore onClick={this.loadMore} />}
        <ToastContainer theme="dark" position="bottom-center" autoClose={3000} />
      </div>)
    }
  }
}





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