import { Router } from 'express'
import * as authorsController from '../controllers/authors-controller.js'
import { validateAuthor } from '../validaciones/authors.validaciones.js'

const router = Router()

router.get('/', authorsController.getAllAuthors)
router.get('/:id', authorsController.getAuthorById)
router.post('/', validateAuthor, authorsController.createAuthor)
router.put('/:id', validateAuthor, authorsController.updateAuthor)

router.delete('/:id', authorsController.deleteAuthor)

export default router