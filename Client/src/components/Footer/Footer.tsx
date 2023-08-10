/**
 * Footer component
 */
function Footer() {
  return (
    <footer className="footer bg-gray-800 text-white">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
        
        <div>
          <h3 className="font-bold mb-2">About Us</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lacinia odio vitae vestibulum. Donec malesuada sapien ante, at vehicula orci tempor molestie.
          </p>
        </div>

        <div>
          <h3 className="font-bold mb-2">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="/home" className="hover:text-gray-400">Home</a></li>
            <li><a href="/about" className="hover:text-gray-400">About</a></li>
            <li><a href="/contact" className="hover:text-gray-400">Contact</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-2">Follow Us</h3>
          <ul className="flex space-x-4 justify-center">
            <li><a href="#" className="hover:text-gray-400"><i className="fab fa-twitter"></i></a></li>
            <li><a href="#" className="hover:text-gray-400"><i className="fab fa-instagram"></i></a></li>
            <li><a href="#" className="hover:text-gray-400"><i className="fab fa-linkedin"></i></a></li>
          </ul>
        </div>
        
      </div>
      <div className="text-center mt-4 bg-slate-900 ">
        <p>&copy; 2023 All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
