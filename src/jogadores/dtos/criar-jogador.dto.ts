import { ApiProperty } from "@nestjs/swagger";

export class CriarJogadorDto {
    @ApiProperty()
    readonly telefoneCelular: string;
    @ApiProperty()
    readonly email: string;
    @ApiProperty()
    readonly nome: string;
}