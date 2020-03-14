import Company from './company.model';

/**
 * @swagger
 *  components:
 *    schemas:
 *      Person:
 *        type: object
 *        required:
 *          - name
 *        properties:
 *          id:
 *            type: number
 *          name:
 *            type: string
 *          companies:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/Company'
 *        example:
 *          id: 1
 *          name: Bill Gates
 *          companies:
 *            - id: 1
 *              name: Microsoft
 */
export default class Person {
  id: string;
  name: string;
  companies: Company[] = [];

  constructor(id: string, name: string, companies: Company[] = []) {
    this.id = id;
    this.name = name;
    this.companies = companies;
  }
}
