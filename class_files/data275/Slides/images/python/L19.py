import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import matplotlib

plt.style.use('seaborn-v0_8-whitegrid')
matplotlib.rc('xtick', labelsize=16)
matplotlib.rc('ytick', labelsize=16)


def MW_rotcurve():
    data = pd.read_csv('./MW_RotCurve.csv', header=None, delimiter=' ', names=['dist', 'speed'] )

    fig, ax = plt.subplots(figsize=(15,7.5), dpi=96)
    ax.plot(data.dist, data.speed, 'o', markersize=12)
    ax.set_xlabel('Distance from center (in 1000 lyrs)', fontsize=18)
    ax.set_ylabel('Orbital speed (km/s)', fontsize=18)
    plt.savefig('MW_RotCurve.png', facecolor='#ffffff00', bbox_inches='tight')
    plt.show()

def other_rotcurve():
    g1 = pd.read_csv('./UGC2885.csv', header=None, delimiter=' ', names=['dist', 'speed'] )
    g2 = pd.read_csv('./NGC7541.csv', header=None, delimiter=' ', names=['dist', 'speed'] )
    g3 = pd.read_csv('./NGC801.csv', header=None, delimiter=' ', names=['dist', 'speed'] )
    g4 = pd.read_csv('./NGC2998.csv', header=None, delimiter=' ', names=['dist', 'speed'] )

    fig, ax = plt.subplots(figsize=(15,7.5), dpi=96)
    ax.plot(g1.dist, g1.speed, lw=3, label='UGC 2885')
    ax.plot(g2.dist, g2.speed, lw=3, label='NGC 7541')
    ax.plot(g3.dist, g3.speed, lw=3, label='NGC 801')
    ax.plot(g4.dist, g4.speed, lw=3, label='NGC 2998')
    ax.set_xlabel('Distance from center (in 1000 lyrs)', fontsize=18)
    ax.set_ylabel('Orbital speed (km/s)', fontsize=18)
    ax.legend(fontsize=16)
    plt.savefig('Other_RotCurve.png', facecolor='#ffffff00', bbox_inches='tight')
    plt.show()

if __name__ == '__main__':
    # MW_rotcurve()
    other_rotcurve()
