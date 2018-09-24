// import React from 'react'
// import axios, { post } from 'axios';

// class SimpleReactFileUpload extends React.Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//             file: null
//         }
//         this.onFormSubmit = this.onFormSubmit.bind(this)
//         this.onChange = this.onChange.bind(this)
//     }
//     onFormSubmit(e) {
//         e.preventDefault() // Stop form submit

//     }
//     onChange(e) {
//         this.setState({ file: e.target.value })
//         console.log(e.target.files[0])
//         console.log(e.target.value)

//     }

//     render() {
//         return (
//             <form onSubmit={this.onFormSubmit}>
//                 <h1>File Upload</h1>
//                 <input type="file" onChange={this.onChange} />
//                 <button type="submit">Upload</button>
//                 <img src={`${this.state.file}`} alt="" />
//             </form>
//         )
//     }
// }



// export default SimpleReactFileUpload