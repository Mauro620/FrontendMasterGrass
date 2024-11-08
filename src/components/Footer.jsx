import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200 py-10">
      <div className="container mx-auto px-4">
        {/* Main footer sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Support Section */}
          <div>
            <h3 className="font-semibold text-white">Asistencia</h3>
            <ul className="mt-4 text-sm space-y-2">
              <li><a href="/help" className="hover:underline">Centro de ayuda</a></li>
              <li><a href="/support" className="hover:underline">Atención al cliente</a></li>
              <li><a href="/faq" className="hover:underline">Preguntas frecuentes</a></li>
              <li><a href="/contact" className="hover:underline">Contacto</a></li>
              <li><a href="/cancellation-policy" className="hover:underline">Política de cancelación</a></li>
            </ul>
          </div>

          {/* Property Owners Section */}
          <div>
            <h3 className="font-semibold text-white">Propietarios</h3>
            <ul className="mt-4 text-sm space-y-2">
              <li><a href="/list-property" className="hover:underline">Publica tu terreno</a></li>
              <li><a href="/owner-resources" className="hover:underline">Recursos para propietarios</a></li>
              <li><a href="/safety-guidelines" className="hover:underline">Guía de seguridad</a></li>
              <li><a href="/earnings-calculator" className="hover:underline">Calculadora de ganancias</a></li>
              <li><a href="/host-community" className="hover:underline">Comunidad de propietarios</a></li>
            </ul>
          </div>

          {/* Company Info Section */}
          <div>
            <h3 className="font-semibold text-white">AlquilaTerreno</h3>
            <ul className="mt-4 text-sm space-y-2">
              <li><a href="/about" className="hover:underline">Sobre nosotros</a></li>
              <li><a href="/sustainability" className="hover:underline">Sostenibilidad</a></li>
              <li><a href="/careers" className="hover:underline">Únete a nuestro equipo</a></li>
              <li><a href="/investors" className="hover:underline">Inversionistas</a></li>
              <li><a href="/press" className="hover:underline">Sala de prensa</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center text-sm">
          <p className="text-gray-500">&copy; 2024 AlquilaTerreno. Todos los derechos reservados.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="/privacy" className="hover:underline">Privacidad</a>
            <a href="/terms" className="hover:underline">Términos</a>
            <a href="/sitemap" className="hover:underline">Mapa del sitio</a>
            <a href="/company-info" className="hover:underline">Datos de la empresa</a>
          </div>
          <div className="flex space-x-4 mt-4 md:mt-0 items-center">
            <span>🌐 Español (CO)</span>
            <span>💲COP</span>
            {/* Social media icons */}
            <a href="https://facebook.com" className="text-gray-500 hover:text-white">
              <FontAwesomeIcon icon={faFacebook} size="lg" />
            </a>
            <a href="https://twitter.com" className="text-gray-500 hover:text-white">
              <FontAwesomeIcon icon={faTwitter} size="lg" />
            </a>
            <a href="https://instagram.com" className="text-gray-500 hover:text-white">
              <FontAwesomeIcon icon={faInstagram} size="lg" />
            </a>
            <a href="https://linkedin.com" className="text-gray-500 hover:text-white">
              <FontAwesomeIcon icon={faLinkedin} size="lg" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;