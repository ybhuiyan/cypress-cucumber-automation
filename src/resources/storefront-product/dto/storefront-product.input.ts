import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class StorefrontProductInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  id: number;

  @Field(() => String, {
    description: 'Example field (placeholder)',
  })
  itemNumber: string;

  @Field(() => Int, {
    description: 'Example field (placeholder)',
  })
  manufacturerId: number;

  @Field(() => String, {
    description: 'Example field (placeholder)',
  })
  manufacturerPartNumber: string;

  @Field(() => Int, {
    description: 'Example field (placeholder)',
  })
  primaryCategoryId: number;

  @Field(() => Int, {
    description: 'Example field (placeholder)',
  })
  productStatusId: number;

  @Field(() => String, {
    description: 'Example field (placeholder)',
  })
  itemName: string;
}

// @InputType()
// export class StorefrontProductInput implements StorefrontProductModel {
//   @Field(() => Int, {
//     description: 'Id of the product variant attribute you are assigning',
//   })
//   productVariantAttributeId: number;

//   @Field(() => String, { description: 'Value for the attribute' })
//   value: string;
// }
