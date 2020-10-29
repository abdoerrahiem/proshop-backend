const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(401)
    throw new Error('Akses ditolak, kamu tidak terdaftar sebagai Admin.')
  }
}

export default admin
