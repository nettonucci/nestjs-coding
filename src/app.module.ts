import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JogadoresModule } from './jogadores/jogadores.module';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://admin:puWx9JsJHS9IIeK5@cluster0.tijrr.mongodb.net/smartranking?retryWrites=true&w=majority',
      { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false }),
    JogadoresModule
  ],
  controllers: [],
  providers: []
})
export class AppModule { }
