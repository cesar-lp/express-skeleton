/**
 * @swagger
 *  components:
 *    schemas:
 *      Company:
 *        type: object
 *        required:
 *          - name
 *        properties:
 *          id:
 *            type: number
 *          name:
 *            type: string
 *        example:
 *           id: 1
 *           name: Microsoft
 */
export default class Company {
  id: string;
  name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}
