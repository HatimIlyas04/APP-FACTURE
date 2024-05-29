import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './FormLogin.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGooglePlusG, faFacebookF, faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { useDispatch, useSelector } from "react-redux";
import { login } from '../../store/auth';
import { useEffect } from 'react';

const FormLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate(); // Hook for navigation

    const adminEmail = 'ilyas@gmail.com'; // E-mail administrateur statique
    const adminPassword = 'ilyas123'; // Mot de passe administrateur statique
    const { loggedIn } = useSelector((state) => state.auth);

    useEffect(() => {
        if (loggedIn) {
            navigate('/')
        }
    }, [])
    
    const dispatch = useDispatch()
    const handleLogin = (e) => {
        e.preventDefault();
        // Vérifier si l'e-mail et le mot de passe saisis correspondent aux identifiants de l'administrateur
        if (email === adminEmail && password === adminPassword) {
            // Définir isLoggedIn sur true lors de la connexion réussie
            // setIsLoggedIn(true);
            dispatch(login())
            // console.log(isLoggedIn);
            // Effacer les champs e-mail et mot de passe
            setEmail('');
            setPassword('');
            // Rediriger vers la page des factures après connexion réussie
            navigate('/');
        } else {
            alert('E-mail ou mot de passe incorrect. Veuillez réessayer.');
        }
    };

    // Function to render the list of invoices
    const renderInvoiceList = () => {
        // Implement your logic for rendering the invoice list component here
        return <InvoiceList />;
    };

    return (
        <div className="container" id="container">
            {!isLoggedIn && (
                <div className="form-container sign-in">
                    <form onSubmit={handleLogin}>
                        <h1>Se connecter</h1>
                        <div className="social-icons">
                            <a href="#" className="icon"><FontAwesomeIcon icon={faGooglePlusG} className="icon" /></a>
                            <a href="#" className="icon"><FontAwesomeIcon icon={faFacebookF} className="icon" /></a>
                            <a href="https://github.com/HatimIlyas04" className="icon"><FontAwesomeIcon icon={faGithub} className="icon" /></a>
                            <a href="https://www.linkedin.com/in/ilyass-hatim-8446a1295/" className="icon"><FontAwesomeIcon icon={faLinkedinIn} className="icon" /></a>
                        </div>
                        <span>Ou utilisez votre e-mail et mot de passe</span>
                        <input 
                            type="email" 
                            placeholder="E-mail" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                        />
                        <input 
                            type="password" 
                            placeholder="Mot de passe" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                        <a href="#">→ Mot de passe oublié ? ←</a>
                        <button type="submit">Se connecter</button>
                    </form>
                </div>
            )}
            {isLoggedIn && renderInvoiceList()} {/* Render invoice list if logged in */}
            <div className="toggle-container">
                <div className="toggle">
                    <div className="toggle-panel toggle-left">
                        <h1>De retour !</h1>
                        <p>Entrez vos coordonnées personnelles pour utiliser toutes les fonctionnalités du site</p>
                        <button className="hidden" id="login">Se connecter</button>
                    </div>
                    <div className="toggle-panel toggle-right">
                        <h2>Bonjour, administrateur !</h2>
                        <p>Inscrivez-vous avec vos coordonnées personnelles pour utiliser toutes les fonctionnalités du site</p>
                        {/* <button className="hidden" id="register">S'inscrire</button> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormLogin;
