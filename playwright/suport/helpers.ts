export function generateOrderCode(): string {
    const prefixo: string = 'VLO-';
    const caracteres: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let sufixoAleatorio: string = '';
  
    for (let i = 0; i < 6; i++) {
      const indiceAleatorio:number = Math.floor(Math.random() * caracteres.length);
      sufixoAleatorio += caracteres.charAt(indiceAleatorio);
    }
  
    return `${prefixo}${sufixoAleatorio}`;
  }