/**
 * @openapi
 * components:
 *  schemas:
 *    Account:
 *      type: object
 *      required:
 *        - account_id
 *        - user_id
 *        - displayName
 *        - email
 *      properties:
 *        account_id:
 *          type: string
 *          default: '369fdcfe-b891-454b-b1f9-a0fa403a38d9'
 *        user_id:
 *          type: string
 *          default: '117146372278994568636'
 *        displayName:
 *          type: string
 *          default: 'Newton'
 *        email:
 *          type: string
 *          default: '@'
 *    GetAccoutResponse:
 *      type: object
 *      properties:
 *        account_id:
 *          type: string
 *        user_id:
 *          type: string
 *        displayName:
 *          type: string
 *        email:
 *          type: string
 */

