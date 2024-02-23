"""
Code to fit an ellipse and return parameters
Taken from: https://stackoverflow.com/questions/13635528/fit-a-ellipse-in-python-given-a-set-of-points-xi-xi-yi
with minor alterations
"""

import numpy as np
import numpy.linalg as linalg

def fitEllipse(x,y):
    x = np.array(x)
    y = np.array(y)
    x = x[:,np.newaxis]
    y = y[:,np.newaxis]
    D =  np.hstack((x*x, x*y, y*y, x, y, np.ones_like(x)))
    S = np.dot(D.T,D)
    C = np.zeros([6,6])
    C[0,2] = C[2,0] = 2; C[1,1] = -1
    E, V =  linalg.eig(np.dot(linalg.inv(S), C))
    n = np.argmax(np.abs(E))
    a = V[:,n]
    return a

def ellipse_center(a):
    b,c,d,f,g,a = a[1]/2, a[2], a[3]/2, a[4]/2, a[5], a[0]
    num = b*b-a*c
    x0=(c*d-b*f)/num
    y0=(a*f-b*d)/num
    return np.array([x0,y0])

def ellipse_angle_of_rotation( a ):
    b,c,d,f,g,a = a[1]/2, a[2], a[3]/2, a[4]/2, a[5], a[0]
    if b == 0 and a < c:
        return 0
    elif b == 0 and a > c:
        return np.pi/2
    elif b != 0 and a < c:
        return 0.5 * np.arctan(2*b/(a-c)) + np.pi / 2
    elif b != 0 and a > c:
        return 0.5 * np.arctan(2*b/(a-c))

def ellipse_axis_length( a ):
    b,c,d,f,g,a = a[1]/2, a[2], a[3]/2, a[4]/2, a[5], a[0]
    up = 2*(a*f*f+c*d*d+g*b*b-2*b*d*f-a*c*g)
    down1=(b*b-a*c)*( (c-a)*np.sqrt(1+4*b*b/((a-c)*(a-c)))-(c+a))
    down2=(b*b-a*c)*( (a-c)*np.sqrt(1+4*b*b/((a-c)*(a-c)))-(c+a))
    res1=np.sqrt(up/down1)
    res2=np.sqrt(up/down2)
    return np.array([res1, res2])

def fit_ellipse(x, y):
    xmean = x.mean()
    ymean = y.mean()
    x -= xmean
    y -= ymean
    a = fitEllipse(x,y)
    center = ellipse_center(a)
    center[0] += xmean
    center[1] += ymean
    phi = ellipse_angle_of_rotation(a)
    axes = ellipse_axis_length(a)
    x += xmean
    y += ymean
    S = {
        'coef': a,
        'center': center,
        'semimajor': max(axes),
        'semiminor': min(axes),
        'angle': phi
    }
    return S

def get_ellipse(fit, n=360):
    """ Calculates the points on the ellipse described by the fit argument,
    as returned by fit_ellipse, where n is the number of points to render.
    """
    tt = np.linspace(0, 2*np.pi, n)
    sa = np.sin(fit.get('angle'))
    ca = np.cos(fit.get('angle'))
    ct = np.cos(tt)
    st = np.sin(tt)

    x = fit['center'][0] + fit['semimajor'] * ct * ca - fit['semiminor'] * st * sa
    y = fit['center'][1] + fit['semimajor'] * ct * sa + fit['semiminor'] * st * ca

    return (x, y)

def create_test_ellipse(Rx=300, Ry=200, Cx=250, Cy=150, Rotation=0.4, NoiseLevel=0.5):
    """Generates a noisy ellipse. """
    t = np.arange(0, 100, 1)
    x = Rx * np.cos(t)
    y = Ry * np.sin(t)
    nx = x * np.cos(Rotation) - y * np.sin(Rotation) + Cx
    nx += np.random.normal(size=len(t))*NoiseLevel
    ny = x * np.sin(Rotation) + y * np.cos(Rotation) + Cy
    ny += np.random.normal(size=len(t))*NoiseLevel

    return nx, ny


def test_everything(n=8):
    import matplotlib.pyplot as plt
    import math

    plt.style.use('ggplot')
    nc = nr = math.ceil(n**0.5)
    print(nc,nr)

    fig, ax = plt.subplots(ncols=nc, nrows=nr)
    for i,ang in enumerate(np.linspace(0, 2*np.pi, n)):
        A = create_test_ellipse(Rx=600, Rotation=ang, NoiseLevel=20)
        efit = fit_ellipse(*A)
        print(efit)
        ax[(i//nr),(i%nc)].plot(*A, '.', color=f"C{i}")
        ax[(i//nr),(i%nc)].plot(*get_ellipse(efit), color=f"C{i}")
        ax[(i//nr),(i%nc)].set_xlim(A[0].min()-10, A[0].max()+10)
        ax[(i//nr),(i%nc)].set_ylim(A[1].min()-10, A[1].max()+10)
        ax[(i//nr),(i%nc)].set_title(f"Angle: {round(ang*180/np.pi)}")
    plt.tight_layout()
    plt.show()
       

# if __name__ == '__main__':
    # test_everything()
