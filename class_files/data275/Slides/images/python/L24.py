import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import matplotlib

plt.style.use('seaborn-v0_8-whitegrid')
matplotlib.rc('xtick', labelsize=20)
matplotlib.rc('ytick', labelsize=20)



def create_hubble():
    data = pd.read_csv('./HubbleDeep.csv')
    data['dist_pc'] = 10 ** (1 + data['MU_SH0ES']/5)
    data = data.sort_values('dist_pc')
    plt.figure(figsize=(16,9))
    plt.plot(data.dist_pc/1E6, data.zHD*3E5, '.', alpha=0.5, markersize=25)
    plt.plot(data.dist_pc/1E6, 72 * data.dist_pc/1E6, '--', lw=3, color='C4')
    plt.xlabel('Distance (Mpc)', fontsize=22)
    plt.ylabel('Velocity (km/s)', fontsize=22)
    plt.savefig('hubbledeep.png', facecolor='#ffffff00', bbox_inches='tight')
    plt.show()


if __name__ == '__main__':
    create_hubble()
