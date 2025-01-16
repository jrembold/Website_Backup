import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import matplotlib

plt.style.use('seaborn-v0_8-whitegrid')
matplotlib.rc('xtick', labelsize=16)
matplotlib.rc('ytick', labelsize=16)

df = pd.read_csv('./Shapley.csv', names=['V1', 'V2', 'V3', 'V4'], delimiter=' ')
print(df)

fig = plt.figure(figsize=(7.5, 7.5), dpi=96)
plt.plot(df.V1, df.V2, '.', markersize=15, label='Globular Clusters')
plt.plot(0,0, '.', markersize=20, color='C2', label='Our Sun')
plt.plot(16,0, '.', markersize=15, color='C1', label='Center of Clusters')
plt.xlabel('Distance from Sun (kpc)', fontsize=18)
plt.ylabel('Distance from Sun (kpc)', fontsize=18)
plt.legend(fontsize=16, fancybox=True, frameon=True, facecolor='white')
plt.savefig('shapley.png', facecolor='#ffffff00', bbox_inches='tight')
plt.show()
