export class MoveDto {
  gameId: string;
  from: string;
  to: string;
  piece: string;
  captured?: string;
  promotion?: string;
  san: string;
  before: string;
  after: string;
}
