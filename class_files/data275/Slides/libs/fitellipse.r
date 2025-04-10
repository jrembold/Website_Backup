
fit_ellipse <- function (x, y = NULL) {
  # from:
  # http://r.789695.n4.nabble.com/Fitting-a-half-ellipse-curve-tp2719037p2720560.html
  #
  # Least squares fitting of an ellipse to point data
  # using the algorithm described in: 
  #   Radim Halir & Jan Flusser. 1998. 
  #   Numerically stable direct least squares fitting of ellipses. 
  #   Proceedings of the 6th International Conference in Central Europe 
  #   on Computer Graphics and Visualization. WSCG '98, p. 125-132 
  #
  # Adapted from the original Matlab code by Michael Bedward (2010)
  # michael.bedward@gmail.com
  #
  # Subsequently improved by John Minter (2012)
  # 
  # Arguments: 
  # x, y - x and y coordinates of the data points.
  #        If a single arg is provided it is assumed to be a
  #        two column matrix.
  #
  # Returns a list with the following elements: 
  #
  # coef - coefficients of the ellipse as described by the general 
  #        quadratic:  ax^2 + bxy + cy^2 + dx + ey + f = 0 
  #
  # center - center x and y
  #
  # semimajor - major semi-axis length
  #
  # semiminor - minor semi-axis length
  #
  EPS <- 1.0e-8 
  dat <- xy.coords(x, y) 
  
  D1 <- cbind(dat$x * dat$x, dat$x * dat$y, dat$y * dat$y) 
  D2 <- cbind(dat$x, dat$y, 1) 
  S1 <- t(D1) %*% D1 
  S2 <- t(D1) %*% D2 
  S3 <- t(D2) %*% D2 
  T <- -solve(S3) %*% t(S2) 
  M <- S1 + S2 %*% T 
  M <- rbind(M[3,] / 2, -M[2,], M[1,] / 2) 
  evec <- eigen(M)$vec 
  cond <- 4 * evec[1,] * evec[3,] - evec[2,]^2 
  a1 <- evec[, which(cond > 0)] 
  f <- c(a1, T %*% a1) 
  names(f) <- letters[1:6] 
  
  # calculate the center and lengths of the semi-axes 
  #
  # see http://www.ncbi.nlm.nih.gov/pmc/articles/PMC2288654/
  # J. R. Minter
  # for the center, linear algebra to the rescue
  # center is the solution to the pair of equations
  # 2ax +  by + d = 0
  # bx  + 2cy + e = 0
  # or
  # | 2a   b |   |x|   |-d|
  # |  b  2c | * |y| = |-e|
  # or
  # A x = b
  # or
  # x = Ainv b
  # or
  # x = solve(A) %*% b
  A <- matrix(c(2*f[1], f[2], f[2], 2*f[3]), nrow=2, ncol=2, byrow=T )
  b <- matrix(c(-f[4], -f[5]), nrow=2, ncol=1, byrow=T)
  soln <- solve(A) %*% b

  b2 <- f[2]^2 / 4
  
  center <- c(soln[1], soln[2]) 
  names(center) <- c("x", "y") 
  
  num  <- 2 * (f[1] * f[5]^2 / 4 + f[3] * f[4]^2 / 4 + f[6] * b2 - f[2]*f[4]*f[5]/4 - f[1]*f[3]*f[6]) 
  den1 <- (b2 - f[1]*f[3]) 
  den2 <- sqrt((f[1] - f[3])^2 + 4*b2) 
  den3 <- f[1] + f[3] 
  
  semi.axes <- sqrt(c( num / (den1 * (den2 - den3)),  num / (den1 * (-den2 - den3)) )) 
  
  # calculate the angle of rotation 
  #term <- (f[1] - f[3]) / f[2] 
  if ( (f[2] == 0) & (f[1] < f[3])) {
    angle <- 0
  } else if ( (f[2] == 0) & (f[1] > f[3])) {
    angle <- pi/2
  } else if ( (f[2] != 0) & (f[1] < f[3])) {
    angle <- 0.5 * atan(f[2]/(f[1]-f[3])) + pi/2
  } else {
    angle <- 0.5 * atan(f[2]/(f[1]-f[3]))
  }
  #angle <- atan2(f[2], f[1] - f[3]) / 2 
  
  list(coef=f, center = center, semimajor = max(semi.axes), semiminor = min(semi.axes), angle = unname(angle)) 
}

get_ellipse <- function( fit, n=360 ) 
{
  # Calculate points on an ellipse described by 
  # the fit argument as returned by fit.ellipse 
  # 
  # n is the number of points to render 
  
  tt <- seq(0, 2*pi, length=n) 
  sa <- sin(fit$angle) 
  ca <- cos(fit$angle) 
  ct <- cos(tt) 
  st <- sin(tt) 
  
  x <- fit$center[1] + fit$semimajor * ct * ca - fit$semiminor * st * sa 
  y <- fit$center[2] + fit$semimajor * ct * sa + fit$semiminor * st * ca 
  
  cbind(x=x, y=y) 
}

create_test_ellipse <- function(Rx=300,         # X-radius
                                Ry=200,         # Y-radius
                                Cx=250,         # X-center
                                Cy=150,         # Y-center
                                Rotation=0.4,   # Radians
                                NoiseLevel=0.5) # Gaussian Noise level
{
  set.seed(42)
  t <- seq(0, 100, by=1)
  x <- Rx * cos(t)
  y <- Ry * sin(t)
  nx <- x*cos(Rotation)-y*sin(Rotation) + Cx
  nx <- nx + rnorm(length(t))*NoiseLevel 
  ny <- x*sin(Rotation)+y*cos(Rotation) + Cy
  ny  <- ny + rnorm(length(t))*NoiseLevel
  cbind(x=nx, y=ny)
}
