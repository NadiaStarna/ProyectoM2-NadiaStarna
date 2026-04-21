import { Router } from 'express'
import * as authorsController from '../controllers/authors-controller.js'

const router = Router()

router.get('/', authorsController.getAllAuthors)
router.get('/:id', authorsController.getAuthorById)
router.post('/', authorsController.createAuthor)
router.put('/:id', authorsController.updateAuthor)
router.delete('/:id', authorsController.deleteAuthor)

export default router