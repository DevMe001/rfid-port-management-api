/**
 * @openapi
 * components:
 *  schemas:
 *    Vehicles:
 *      type: object
 *      required:
 *        - vehicle_name
 *        - vehicle_type
 *        - vehicle_photo
 *        - vehicle_price
 *      properties:
 *        vehicle_name:
 *          type: string
 *          default: 'Stair Feeries'
 *        vehicle_type:
 *          type: string
 *          default: 'open'
 *        vehicle_photo:
 *          type: string
 *          default: './uploade/boat.jpg'
 *        vehicle_price:
 *          type: number
 *          default: '1500'
 *    GetVehicleResponse:
 *      type: object
 *      properties:
 *        vehicle_name:
 *          type: string
 *        vehicle_type:
 *          type: string
 *        vehicle_photo:
 *          type: string
 *        vehicle_price:
 *          type: number
 */
