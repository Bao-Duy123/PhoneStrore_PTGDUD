import React, { useState, useEffect } from 'react';
import Button from './Button';

const EyeIcon = () => (
  <svg className="w-5 h-5 text-gray-400 absolute right-3 top-3.5 cursor-pointer hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const LoginView = ({ setView }) => (
  <div className="flex flex-col md:flex-row w-full">
    {/* Banner trái */}
    <div className="hidden md:block w-[45%] bg-white border-r border-gray-200 p-8 flex items-center justify-center flex-col">
        <h3 className="font-extrabold mb-4 text-xl tracking-widest uppercase">OPPO</h3>
       <img 
         src="https://placehold.co/400x500/ffffff/333333?text=OPPO+Find+N6\nBanner" 
         alt="Oppo Find N6 Promo" 
         className="w-full h-auto object-contain mb-4 rounded-xl border border-gray-100 shadow-sm"
       />
       <Button className="!bg-[#fca5a5] !text-black hover:!bg-[#f87171] px-8 rounded-full font-bold shadow-md">MUA NGAY</Button>
    </div>
    {/* Form đăng nhập */}
    <div className="w-full md:w-[55%] p-8 md:p-12 flex flex-col justify-center relative min-h-[500px]">
       <h2 className="text-2xl font-extrabold text-center mb-8 text-black">Đăng nhập PhoneStore</h2>
       
       <div className="space-y-5 mb-6">
         <div>
           <label className="block text-base font-bold text-black mb-2">Số điện thoại</label>
           <input type="text" placeholder="Nhập số điện thoại của bạn" className="w-full border-2 border-gray-300 text-black rounded-lg px-4 py-3 outline-none focus:ring-4 focus:ring-red-100 focus:border-[#d00000] transition-all" />
         </div>
         <div>
           <label className="block text-base font-bold text-black mb-2">Mật khẩu</label>
           <div className="relative">
             <input type="password" placeholder="Nhập mật khẩu của bạn" className="w-full border-2 border-gray-300 text-black rounded-lg pl-4 pr-10 py-3 outline-none focus:ring-4 focus:ring-red-100 focus:border-[#d00000] transition-all" />
             <EyeIcon />
           </div>
         </div>
       </div>
       
       <Button variant="danger" className="w-full !bg-[#d00000] hover:!bg-[#b00000] !py-3 text-lg font-bold mb-4 shadow-md rounded-lg transition-all">Đăng nhập</Button>
       
       <div className="text-center mb-10">
         <a href="#" className="text-blue-500 hover:underline text-base transition-all hover:text-blue-600">Quên mật khẩu ?</a>
       </div>
       
       <div className="text-center mb-12">
         <span className="text-gray-500 text-base">Bạn chưa có tài khoản? </span>
         <button onClick={() => setView('register')} className="text-[#f87171] hover:text-[#dc2626] hover:underline text-base font-medium transition-all">Đăng ký ngay</button>
       </div>
       
       <div className="absolute bottom-4 right-4 md:bottom-6 md:right-8">
         <button className="bg-gray-200 text-black font-semibold hover:bg-gray-300 text-sm px-4 py-2 rounded-md transition-colors">
           Đăng nhập với quyền admin
         </button>
       </div>
    </div>
  </div>
);

const RegisterView = ({ setView }) => (
  <div className="p-8 md:p-12 w-full max-w-3xl mx-auto">
    <h2 className="text-3xl font-extrabold text-center mb-10 text-black">Tạo tài khoản</h2>
    
    <div className="mb-8">
      <h3 className="text-xl font-bold text-black mb-5">Thông tin cá nhân</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-base font-bold text-black mb-2">Họ và tên</label>
          <input type="text" placeholder="Nhập họ và tên" className="w-full border-2 border-gray-300 text-black rounded-lg px-4 py-3 outline-none focus:border-[#d00000] focus:ring-4 focus:ring-red-100 transition-all text-sm" />
        </div>
        <div>
          <label className="block text-base font-bold text-black mb-2">Ngày sinh</label>
          <input type="text" placeholder="dd/mm/yyyy" className="w-full border-2 border-gray-300 text-black rounded-lg px-4 py-3 outline-none focus:border-[#d00000] focus:ring-4 focus:ring-red-100 transition-all text-sm" />
        </div>
        <div>
          <label className="block text-base font-bold text-black mb-2">Số điện thoại</label>
          <input type="text" placeholder="Nhập số điện thoại" className="w-full border-2 border-gray-300 text-black rounded-lg px-4 py-3 outline-none focus:border-[#d00000] focus:ring-4 focus:ring-red-100 transition-all text-sm" />
        </div>
        <div>
          <label className="block text-base font-bold text-black mb-2">Email</label>
          <input type="email" placeholder="Nhập email" className="w-full border-2 border-gray-300 text-black rounded-lg px-4 py-3 outline-none focus:border-[#d00000] focus:ring-4 focus:ring-red-100 transition-all text-sm" />
        </div>
      </div>
    </div>

    <div className="mb-10">
      <h3 className="text-xl font-bold text-black mb-5">Tạo mật khẩu</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
        <div>
          <label className="block text-base font-bold text-black mb-2">Mật khẩu</label>
          <div className="relative">
            <input type="password" placeholder="Nhập mật khẩu của bạn" className="w-full border-2 border-gray-300 text-black rounded-lg pl-4 pr-10 py-3 outline-none focus:border-[#d00000] focus:ring-4 focus:ring-red-100 transition-all text-sm" />
            <EyeIcon />
          </div>
          <div className="flex gap-2 items-start mt-2">
            <div className="bg-black text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">!</div>
            <p className="text-xs text-gray-500 font-bold leading-snug">Mật khẩu tối thiểu 6 ký tự, có ít nhất <br/>1 chữ số và 1 số</p>
          </div>
        </div>
        <div>
          <label className="block text-base font-bold text-black mb-2">Nhập lại mật khẩu</label>
          <div className="relative">
            <input type="password" placeholder="Nhập lại mật khẩu" className="w-full border-2 border-gray-300 text-black rounded-lg pl-4 pr-10 py-3 outline-none focus:border-[#d00000] focus:ring-4 focus:ring-red-100 transition-all text-sm" />
            <EyeIcon />
          </div>
        </div>
      </div>
    </div>

    <div className="flex gap-5">
      <button 
        onClick={() => setView('login')} 
        className="flex-1 bg-white text-gray-500 border-2 border-gray-300 font-bold rounded-lg py-3 hover:bg-gray-50 transition-colors"
      >
        &lt; Quay lại đăng nhập
      </button>
      <Button variant="danger" className="flex-1 !bg-[#d00000] hover:!bg-[#b00000] font-bold rounded-lg !py-3 shadow-md transition-all text-lg">
        Hoàn tất đăng kí
      </Button>
    </div>
  </div>
);

const AuthModal = ({ isOpen, onClose, initialView = 'login' }) => {
  const [view, setView] = useState(initialView);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (isOpen) setView(initialView);
  }, [isOpen, initialView]);
 
  if (!isOpen) return null;

  // Đóng modal khi click ra ngoài
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      onClick={handleBackdropClick} 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto"
    >
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-[900px] overflow-hidden my-auto shrink-0 flex animate-in fade-in zoom-in duration-200">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 z-10 p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-full transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
        {view === 'login' ? <LoginView setView={setView} /> : <RegisterView setView={setView} />}
      </div>
    </div>
  );
}

export default AuthModal;