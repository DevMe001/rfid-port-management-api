  /**
 * @openapi
 * /account/{id}:
 *   get:
 *     tags:
 *       - Account
 *     summary: Get account by ID
 *     description: accoun by id.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the user to update
 *         required: true
 *         schema:
 *           type: string
 *       - name: body
 *         in: body
 *         description: Get account user data
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/Account'
 *     responses:
 *       200:
 *         description: Successful retrieve
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetAccoutResponse'
 *       403:
 *         description: Forbidden
 *       404:
 *         description: User not found
 */


