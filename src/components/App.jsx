import React from "react";
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
//  import { ToastContainer } from 'react-toastify';

export class App extends React.Component {
  state = {
    value: '',
  }

  // отримує значення value від Searchbar
  handleFormSubmit = (value) => {
    console.log(this.state.value);
    console.log(value);
    return this.setState({ value });
  }

  render() {  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101'
      }}
    >
      <Searchbar onSubmit={this.handleFormSubmit} />
      {/* <ToastContainer position="top-center"
                      autoClose={3000}
                      hideProgressBar={false}
                      newestOnTop={false}
                      closeOnClick
                      rtl={false}
                      pauseOnFocusLoss
                      draggable
                      pauseOnHover/> */}
    
      <ImageGallery searchValue={ this.state.value} />
    
    </div>
      
  );}

};
