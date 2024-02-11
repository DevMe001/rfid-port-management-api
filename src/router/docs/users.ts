  /**
   * @openapi
   * /users:
   *  get:
   *     tags:
   *     - Users
   *     description: Responds if the app is up and running
   *     responses:
   *       200:
   *         description: App is up and running
   */


  /**
   * @openapi
   * '/user':
   *  post:
   *     tags:
   *     - Users
   *     summary: Register a new user
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/Users'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/CreateUserResponse'
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
 */



  /**
 * @openapi
 * /user/{id}:
 *   put:
 *     tags:
 *       - Users
 *     summary: Update a user by ID
 *     description: Update user details by providing the user ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the user to update
 *         required: true
 *         schema:
 *           type: string
 *       - name: body
 *         in: body
 *         description: Updated user data
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/Users'
 *     responses:
 *       200:
 *         description: Successful update
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UpdateUserResponse'
 *       403:
 *         description: Forbidden
 *       404:
 *         description: User not found
 */

/**
 * @openapi
 * /user/{id}:
 *   delete:
 *     tags:
 *       - Users
 *     summary: Delete a user by ID
 *     description: Delete a user by providing the user ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the user to delete
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted
 *       403:
 *         description: Forbidden
 *       404:
 *         description: User not found
 */

