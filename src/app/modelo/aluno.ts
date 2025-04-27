export interface Aluno {
  id: number
  nome: string
  cpf: string
  data_Nascimento: Date
  email: string
  sexo: string
  telefone: string
  endereco: string | null
  bairro: string | null
  rua: string | null
  complemento: string | null
  estado: string | null
  cidade: string | null
  id_Classe: number
}
