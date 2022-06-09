import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CartProductInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  id: number;
}
