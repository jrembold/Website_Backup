import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import matplotlib

plt.style.use('seaborn-v0_8-whitegrid')
matplotlib.rc('xtick', labelsize=20)
matplotlib.rc('ytick', labelsize=20)


def gen_data():
    xs = np.sort(np.random.uniform(-5,5,size=100))
    a_true = -3
    b_true = 5
    dev = np.random.normal(0,10, size=xs.size)
    y_true = a_true * xs ** 2 + b_true * xs
    y = y_true + dev
    errs = np.abs(y-y_true + np.random.normal(0,1,size=xs.size))

    data = pd.DataFrame({'x': xs, 'y': y, 'y_err': errs})
    data.to_csv('mcmc_fit_example.csv', index=False)

    plt.errorbar(xs, y, yerr=errs, fmt='.')
    plt.savefig('mcmc_fit_example.png', facecolor='#ffffff00', bbox_inches='tight')
    plt.show()

def create_hubble():
    data = pd.read_csv('./Hubble.csv', delimiter=' ', header=None)
    plt.figure(figsize=(16,9))
    plt.plot(data[0], data[1], '.', markersize=20)
    plt.xlabel('Distance (Mpc)', fontsize=22)
    plt.ylabel('Velocity (km/s)', fontsize=22)
    plt.savefig('hubble.png', facecolor='#ffffff00', bbox_inches='tight')
    plt.show()

def hubble_evolution():
    data = pd.read_csv('./HubbleAge.csv', delimiter=' ', header=None)
    plt.figure(figsize=(8,8))
    plt.plot(data[0], data[1], '.', markersize=20, alpha=0.5)
    plt.xlabel('Year', fontsize=22)
    plt.ylabel(r'$H_0$', fontsize=22)
    plt.savefig('hubble_evolution.png', facecolor='#ffffff00', bbox_inches='tight')
    plt.show()

if __name__ == '__main__':
    #gen_data()
    # create_hubble()
    hubble_evolution()
