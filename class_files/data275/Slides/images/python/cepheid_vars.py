import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import matplotlib

plt.style.use('seaborn-v0_8-whitegrid')
matplotlib.rc('xtick', labelsize=16)
matplotlib.rc('ytick', labelsize=16)

df = pd.read_csv('./Type I.csv', names=['period', 'lum'], delimiter=' ')
df2 = pd.read_csv('./Type 2.csv', names=['period', 'lum'], delimiter=' ')
df3 = pd.read_csv('./RR Lyrae.csv', names=['period', 'lum'], delimiter=' ')

fig = plt.figure(figsize=(7.5, 7.5), dpi=96)
plt.loglog(df.period, df.lum, '.', markersize=15, label='Type 1')
plt.loglog(df2.period, df2.lum, '.', markersize=20, color='C2', label='Type 2')
plt.loglog(df3.period, df3.lum, '.', markersize=15, color='C1', label='RR Lyrae')
plt.xlabel('Period (day)', fontsize=18)
plt.ylabel(r'Luminosity ($L_\odot$)', fontsize=18)
plt.legend(fontsize=16, fancybox=True, frameon=True, facecolor='white')
plt.savefig('cepheid_vars.png', facecolor='#ffffff00', bbox_inches='tight')
plt.show()
