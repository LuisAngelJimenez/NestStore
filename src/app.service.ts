import { Injectable } from '@nestjs/common';

//aqui se ejecutan las funciones del orm para guardar, eliminar, actualizar, etc//

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
