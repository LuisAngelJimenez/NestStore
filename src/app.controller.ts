import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  //aqui esta una peticion de tipo Get//
  @Get()
  getHello(): string {
  //aqui van todas las rutas y se ejecutan las funciones del servicio//
    return this.appService.getHello();
  }
}
