import { Injectable } from '@angular/core';

@Injectable()
export class ErrorTranslationService {
    translations = {
        "auth/wrong-password": "Usuario y/o contraseña inválidos.",
        "auth/user-not-found": "Usuario no encontrado en el sistema.",
        "auth/user-disabled": "Usuario bloqueado. Contactar Administrador de sistema.",
        "auth/too-many-requests": "Sobrepaso de intentos de entrada con este usuario. Intente luego o busque al Administrador del sistema.",
        "auth/invalid-email": "Correo inválido.",
        "auth/network-request-failed": "Error de conexión. Revise que su conexión a Internet esté funcionando."
    }
    constructor() {
    }
    getTranslatedError(error):string {
        if(!!this.translations[error.code]) {
            return this.translations[error.code];
        }
        return 'Error code ' + error.code + ':' + error.message;
    }
}