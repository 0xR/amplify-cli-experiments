import React, { Component, useEffect, useState } from 'react';
import Mutation from 'react-apollo/Mutation';
import { createProduct } from './MockData.gql';
import { CreateProductMutation, CreateProductMutationVariables } from './API';
import { commerce, lorem, random } from 'faker';

class CreateProduct extends Mutation<
  CreateProductMutation,
  CreateProductMutationVariables
> {}

const numberOfProducts = 10;

export const MockData = () => {
  const [currentNumber, setNumber] = useState<null | number>(null);

  return (
    <CreateProduct mutation={createProduct}>
      {createProduct =>
        currentNumber === null ? (
          <button
            onClick={async () => {
              for (let i = 0; i < numberOfProducts; i++) {
                setNumber(i);
                await createProduct({
                  variables: {
                    input: {
                      title: commerce.productName(),
                      price: random.number({ min: 1, max: 2000 }),
                      description: lorem.paragraphs(),
                      stock: random.number({ min: 1, max: 150 }),
                      attributes: []
                    }
                  }
                });
              }
              setNumber(null);
            }}
          >
            create mock data
          </button>
        ) : (
          `creating product ${currentNumber + 1} / ${numberOfProducts}`
        )
      }
    </CreateProduct>
  );
};
