const Footer = () => {
  return (
    <div className="bottom-0 w-full">
      <div className="flex justify-around border-b-[1px] border-black border-solid p-5 bg-white">
        <div className="w-1/3 align-middle">
          <h1  className="mb-3">LOGO</h1>
          <h3 className="text-sm">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum
            recusandae porro deserunt voluptatibus aliquid nostrum ipsa dolor,
            error ducimus voluptas, enim vel! Totam rerum qui excepturi a
            repellat debitis labore.
          </h3>
        </div>
        <div className="w-1/3 flex flex-col items-center"> 
          <h1 className="mb-3">COMPANY</h1>
          <ul className="text-sm">
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div className="w-1/3 flex flex-col items-center">
          <h1  className="mb-3">GET IN TOUCH</h1>
          <ul className="text-sm">
            <li>Phone: +1234567890</li>
            <li>Email: xyz@example.com</li>
          </ul>
        </div>
      </div>
      <div className="flex justify-center pt-3 bg-white"><h2>Copyright 2024 &nbsp; &copy; Owncode.dev-All Right Reserved</h2></div>
    </div>
  );
};

export default Footer;