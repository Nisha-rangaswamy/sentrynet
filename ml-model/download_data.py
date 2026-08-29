import pandas as pd

print("Downloading standard NSL-KDD sample dataset for SentryNet...")

# Public URL pointing to a clean CSV sample of the NSL-KDD dataset
url = "https://raw.githubusercontent.com/defcom17/NSL_KDD/master/KDDTrain+.txt"

# Since NSL-KDD doesn't have header rows by default, we can name key flow columns
columns = [
    'duration', 'protocol_type', 'service', 'flag', 'src_bytes', 'dst_bytes', 
    'land', 'wrong_fragment', 'urgent', 'hot', 'num_failed_logins', 'logged_in', 
    'num_compromised', 'root_shell', 'su_attempted', 'num_root', 'num_file_creations', 
    'num_shells', 'num_access_files', 'num_outbound_cmds', 'is_host_login', 
    'is_guest_login', 'count', 'srv_count', 'serror_rate', 'srv_serror_rate', 
    'rerror_rate', 'srv_rerror_rate', 'same_srv_rate', 'diff_srv_rate', 
    'srv_diff_host_rate', 'dst_host_count', 'dst_host_srv_count', 'dst_host_same_srv_rate', 
    'dst_host_diff_srv_rate', 'dst_host_same_src_port_rate', 'dst_host_srv_diff_host_rate', 
    'dst_host_serror_rate', 'dst_host_srv_serror_rate', 'dst_host_rerror_rate', 
    'dst_host_srv_rerror_rate', 'label'
]

# Read a small subset (first 1000 rows) so it loads instantly for exploration
df = pd.read_csv(url, header=None, names=columns, nrows=1000)

print("\n--- DATASET INFO (.info()) ---")
df.info()

print("\n--- FIRST 5 ROWS (.head()) ---")
print(df[['duration', 'protocol_type', 'src_bytes', 'dst_bytes', 'label']].head())

# Save it locally into your ml-model folder as backup data
df.to_csv('ml-model/nsl_kdd_backup.csv', index=False)
print("\nSuccess! Standard dataset downloaded and saved locally as 'ml-model/nsl_kdd_backup.csv'.")