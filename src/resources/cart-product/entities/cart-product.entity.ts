import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class CartProduct {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
