import logo from './logo.svg';
import './App.css';
import React from 'react';


import ModalCreate from './component/ModalCreate'

class App extends React.Component {
  constructor(){
    super();

    this.state = {
      sisaUang : 0,
      persentaseUang : 0,
      pemasukanUang : 0,
      pengeluaranUang : 0,
      transaksiIN : 0,
      transaksiOUT : 0,
      summary : [
        // {
        //   deskripsi : 'Menerima uang',
        //   tanggal : '1 July 2022',
        //   nominal : 10000,
        //   category : 'IN'
        // },
        // {
        //   deskripsi : 'Makan nasi padang',
        //   tanggal : '3 July 2022',
        //   nominal : 15000,
        //   category : 'OUT'
        // },
        // {
        //   deskripsi : 'Menerima uang',
        //   tanggal : '1 July 2022',
        //   nominal : 10000,
        //   category : 'IN'
        // },
        // {
        //   deskripsi : 'Makan nasi padang',
        //   tanggal : '3 July 2022',
        //   nominal : 2500,
        //   category : 'OUT'
        // },
      ]

    }

    this.tambahItem = this.tambahItem.bind(this);
    this.fnHitung = this.fnHitung.bind(this);

  }


  tambahItem(objek) {
    let newData = [...this.state.summary, objek];
    let dataUangIN = newData.filter((item) => item.category === 'IN');
    let nominalUang = dataUangIN.map((item) => item.nominal);
    let jumlahUangIN = nominalUang.reduce((total, num) => total + num, 0);

    let dataUangOUT = newData.filter((item) => item.category === 'OUT');
    let nominalUangOUT = dataUangOUT.map((item) => item.nominal);
    let jumlahUangOUT = nominalUangOUT.reduce((total, num) => total + num, 0);

    this.setState({
      pemasukanUang : jumlahUangIN,
      transaksiIN : nominalUang.length,
      pengeluaranUang : jumlahUangOUT,
      transaksiOUT : nominalUangOUT.length,
      sisaUang : jumlahUangIN - jumlahUangOUT,
      persentaseUang : (jumlahUangIN - jumlahUangOUT) / jumlahUangIN * 100,
      summary : newData
  
    })
    // this.setState({
    //   summary : [...this.state.summary, objek]
    // }) 
  }

  fnHitung() {
    let dataUangIN = this.state.summary.filter((item) => item.category === 'IN');
    let nominalUang = dataUangIN.map((item) => item.nominal);
    let jumlahUangIN = nominalUang.reduce((total, num) => total + num);

    let dataUangOUT = this.state.summary.filter((item) => item.category === 'OUT');
    let nominalUangOUT = dataUangOUT.map((item) => item.nominal);
    let jumlahUangOUT = nominalUangOUT.reduce((total, num) => total + num);

    this.setState({
      pemasukanUang : jumlahUangIN,
      transaksiIN : nominalUang.length,
      pengeluaranUang : jumlahUangOUT,
      transaksiOUT : nominalUangOUT.length,
      sisaUang : jumlahUangIN - jumlahUangOUT,
      persentaseUang : (jumlahUangIN - jumlahUangOUT) / jumlahUangIN * 100
      
    })
  }

  componentDidMount() {
    if(this.state.summary.length < 1) {
      console.log('oke')
    } else {
      this.fnHitung()
    }
  }
  render(){
    return (
      <div className="container py-5">
        <div className='row mb-3'>
          <div className='col-12 text-center'>
            <h1 className='fw-bold'>FEEDUITEN APPS</h1>
              <hr className='w-75 mx-auto'></hr>
            <h2 className='fw-bold'>Rp. {this.state.sisaUang},-</h2>
            <span className='title'>Sisa uang kamu tersisa {this.state.persentaseUang}% lagi</span>
          </div>
        </div>

        <div className='row'>
          <div className='col-6'>
              <div className='card-wrapper p-4'>
                <div className='icon-wrapper mn-money-in mb-1'>
                  <i className="bi bi-wallet2"></i>
                </div>
                  <span className='title-sm'>Pemasukan</span>
                    <h3 className='fw-bold'>Rp {this.state.pemasukanUang},-</h3>
                  <div>
                    <span className='title-md text-ungu'>{this.state.transaksiIN}</span><span className='title-md'> Transfer</span>
                  </div>
              </div>
          </div>
          <div className='col-6'>
              <div className='card-wrapper p-4'>
                <div className='icon-wrapper mn-money-out mb-1'>
                <i className="bi bi-cash-stack"></i>
                </div>
                  <span className='title-sm'>Pengerluaran</span>
                    <h3 className='fw-bold'>Rp {this.state.pengeluaranUang},-</h3>
                  <div>
                    <span className='title-md text-ungu'>{this.state.transaksiOUT}</span><span className='title-md'> Transaksi</span>
                  </div>
              </div>
          </div>
        </div>

      
        <div className='row mt-2 mb-2'>
          <div className='col-12 d-flex justify-content-between align-item-center'>
            <h4>Ringkasan Transaksi</h4>
            <div className='wrapper-button'>
              <ModalCreate action={this.tambahItem} category='IN' modalHeading='Tambahkan Pemasukan' variant='button btn-ungu me-2 px-2 py-2 m-2' text='Pemasukan' icon='bi bi-plus-circle-fill'/>
              <ModalCreate action={this.tambahItem} category='OUT' modalHeading='Tambahkan Pengeluaran' variant='button btn-pink px-2 py-2' text='Pengeluaran' icon='bi bi-dash-circle-fill'/>
              {/* <button className='button btn-ungu me-2 px-2 py-2 m-2'>Pemasukan <i className="bi bi-plus-circle-fill"></i></button>
              <button className='button btn-pink px-2 py-2'>Pengeluaran <i className="bi bi-dash-circle-fill"></i></button> */}
            </div>
          </div>
        </div>

        <div  className='row mb-2'>
          {this.state.summary.length < 1 &&  <Alert/>}
         
        {this.state.summary.map((sum, key)=> {
          return (
              <div key={key} className='col-12 mb-2 d-flex justify-content-between align-items-center'>
                <div className='d-flex align-items-center'>
              
                  <div className={sum.category == "IN" ? 'icon-wrapper mn-money-in icon-list' : 'icon-wrapper mn-money-out icon-list'} >
                    <i className={sum.category == "IN" ? 'bi bi-wallet2' : 'bi bi-bag-check'}></i>
                  </div>
                
                  <div className='transaction ms-3 d-flex flex-column'>
                    <h6>{sum.deskripsi}</h6>
                    <span className='title-sm'>{sum.tanggal}</span>
                  </div>
                </div>
                  <h5 className={sum.category == "IN" ? 'money money-in fw-bold' : 'money money-out fw-bold'} >Rp. {sum.nominal},-</h5>
                </div>
              )
            })
          }
          </div>

      </div>//container
    );
  }
}


class Alert extends React.Component {
  constructor() {
      super()
  }

  render() {
      return(
        <div className='card-wrapper bg-danger'>
          <h4 className='text-center text-white m-5 '>Data masih kosong</h4>
        </div>
      )
  }
}




export default App;
