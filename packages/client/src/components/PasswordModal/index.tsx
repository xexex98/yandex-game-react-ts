import { IconButton, Modal } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';

import { validateAllFields, validateField } from '../../helpers/validate';
import { useAppDispatch } from '../../store';
import { changePassword } from '../../store/modules/auth/authSlice';
import { ErrorAuth } from '../ErrorAuth';

type TProps = {
  open: boolean;
  onClose: () => void;
};

export type TChangePasswordFormValues = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

type TFormErrors = Partial<TChangePasswordFormValues>;

export const PasswordModal = ({ open, onClose }: TProps) => {
  const dispatch = useAppDispatch();
  const [formValues, setFormValues] = useState<TChangePasswordFormValues>({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [formErrors, setFormErrors] = useState<TFormErrors>({});

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    const error = validateField(name, value);

    setFormErrors((prevState) => ({
      ...prevState,
      [name]: error,
    }));
  };

  const handleBlurConfirmPassword = (
    event: React.FocusEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    const error = validateField(name, value, formValues.newPassword);

    setFormErrors((prevState) => ({
      ...prevState,
      [name]: error,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validateAllFields(formValues);

    setFormErrors(validationErrors);

    const noErrors = Object.values(validationErrors).every((error) => !error);

    if (noErrors) {
      dispatch(changePassword(formValues));
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby='change-password-modal'
      aria-describedby='change-password-modal-description'
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          borderRadius: 1,
          boxShadow: 24,
          p: 4,
        }}
      >
        <IconButton
          sx={{ position: 'absolute', top: 8, right: 8 }}
          onClick={onClose}
        >
          X
        </IconButton>
        <Typography
          id='change-password-modal'
          variant='h6'
          component='h2'
        >
          Change Password
        </Typography>
        <Box
          component='form'
          sx={{ mt: 2 }}
          onSubmit={handleSubmit}
          noValidate
        >
          <TextField
            fullWidth
            label='Old Password'
            type='password'
            variant='outlined'
            margin='normal'
            name='oldPassword'
            value={formValues.oldPassword}
            error={Boolean(formErrors.oldPassword)}
            helperText={formErrors.oldPassword}
            onChange={handleChangeInput}
            onBlur={handleBlur}
            required
          />
          <TextField
            fullWidth
            label='New Password'
            type='password'
            variant='outlined'
            margin='normal'
            name='newPassword'
            value={formValues.newPassword}
            error={Boolean(formErrors.newPassword)}
            helperText={formErrors.newPassword}
            onChange={handleChangeInput}
            onBlur={handleBlur}
            required
          />
          <TextField
            fullWidth
            label='Confirm New Password'
            type='password'
            variant='outlined'
            margin='normal'
            name='confirmPassword'
            value={formValues.confirmPassword}
            error={Boolean(formErrors.confirmPassword)}
            helperText={formErrors.confirmPassword}
            onChange={handleChangeInput}
            onBlur={handleBlurConfirmPassword}
            required
          />
          <Button
            type='submit'
            variant='contained'
            color='primary'
            fullWidth
            sx={{ mt: 2 }}
          >
            Submit
          </Button>
          <ErrorAuth />
        </Box>
      </Box>
    </Modal>
  );
};
