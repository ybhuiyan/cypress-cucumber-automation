import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class StorefrontProduct {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
